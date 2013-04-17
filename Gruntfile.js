/*global module:false, __dirname:false*/
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    var loaders = {
            almond: "client/components/almond/almond.js",
            cajon: "client/components/cajon/cajon.js",
            requirejs: "client/components/requirejs/require.js"
        };
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
    var deps = ["q", "underscore", "backbone", "layoutmanager", "jquery"];
    var emptyDeps = deps.
        reduce(function (map, key) {
            map[key] = "empty:";
            return map;
        }, {});
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
                        include: ["bootstrap"], //FIXME
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
                            src: [
                                "bootstrap.js",
                                "*.html",
                                "app/**"
                            ]
                        }
                    ]
                }
            },

            clean: {
                all: ["temp", "client-build", "client-debug"]
            },

            components: {
                deps: deps,
                output: "<%= defaults.dirs.temp %>/requires.js",
                exclude: Object.keys(loaders)
            },

            watch: {
                client: {
                    files: [
                        "<%= defaults.dirs.src %>/*.html",
                        "<%= defaults.dirs.src %>/app/**/*"
                    ],
                    tasks: ["copy:debug"]
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
