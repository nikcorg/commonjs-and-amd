/*global module:false, __dirname:false*/
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    /* Define loaders */
    var loaders = {
            almond: "client/components/almond/almond.js",
            cajon: "client/components/cajon/cajon.js",
            requirejs: "client/components/requirejs/require.js"
        };

    /* Some defaults */
    var defaults = {
            requireConfig: "client/bootstrap.js",
            dirs: {
                src: "client",
                build: "client-build",
                debug: "client-debug",
                temp: "temp"
            },
            build: {
                amdloader: loaders.requirejs
            },
            debug: {
                amdloader: loaders.cajon
            }
        };

    /* This is ugly, but it works. I know there's a bower-package I could use
     * but as this is just a concept demo (for now), I'm happy with the quick
     * and dirty solution.
     * */
    var emptyDeps = Object.keys(require("./component.json").dependencies).
        reduce(function (map, key) {
            map[key] = "empty:";
            return map;
        }, {});

    /* Compile actual Tasks config */
    var config = {
            defaults: defaults,
            loaders: loaders,

            requirejs: {
                options: {
                    baseUrl: "<%= defaults.dirs.src %>/app",
                    mainConfigFile: "<%= defaults.requireConfig %>",
                    keepBuildDir: true
                },
                application: {
                    options: {
                        appDir: "<%= defaults.dirs.src %>/app",
                        baseUrl: "../app",
                        cjsTranslate: true,
                        dir: "<%= defaults.dirs.build %>/app",
                        findNestedDependencies: true,
                        optimize: "uglify",
                        modules: [
                            { name: "main" }
                        ],
                        paths: emptyDeps
                    }
                },
                components: {
                    options: {
                        cjsTranslate: false,
                        include: ["bootstrap"],
                        out: "<%= defaults.dirs.temp %>/components.js",
                        paths: {
                            "bootstrap": "../bootstrap",
                            "app/main": "empty:"
                        }
                    }
                }
            },

            uglify: {
                build: {
                    src: ["<%= defaults.build.amdloader %>", "<%= defaults.dirs.temp %>/components.js"],
                    dest: "<%= defaults.dirs.build %>/amdloader.js"
                },
                debug: {
                    src: ["<%= defaults.debug.amdloader %>", "<%= defaults.dirs.temp %>/components.js"],
                    dest: '<%= defaults.dirs.debug %>/amdloader.js'
                }
            },

            copy: {
                build: {
                    files: [
                        {
                            cwd: "<%= defaults.dirs.src %>",
                            dest: "<%= defaults.dirs.build %>/",
                            expand: true,
                            src: ["*.html"]
                        }
                    ]
                },
                debug: {
                    files: [
                        {
                            cwd: "<%= defaults.dirs.src %>",
                            dest: "<%= defaults.dirs.debug %>/",
                            expand: true,
                            src: ["*.html", "app/**"]
                        }
                    ]
                }
            },

            clean: {
                all: ["temp", "client-build", "client-debug"]
            },

            watch: {
                client: {
                    files: [
                        "<%= defaults.dirs.src %>/*.html",
                        "<%= defaults.dirs.src %>/app/**/*"
                    ],
                    tasks: ["copy:debug"]
                },
                components: {
                    files: [
                        "<%= defaults.dirs.src %>/bootstrap.js"
                    ],
                    tasks: ["requirejs:components", "uglify:debug"]
                }
            }
        };

    grunt.initConfig(config);

    /* Build final front end */
    grunt.registerTask(
        "build",
        [
            "clean",
            "requirejs:application",
            "requirejs:components",
            "uglify:build",
            "copy:build"
        ]
    );

    /* Build debug front end */
    grunt.registerTask(
        "debug",
        [
            "clean",
            "requirejs:components",
            "uglify:debug",
            "copy:debug",
            "watch"
        ]
    );
};
