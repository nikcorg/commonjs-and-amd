/*global module:false, __dirname:false*/
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("generate-requires", "Generate requires.js", function(conf) {
        var config = grunt.config(conf);
        var deps = config.deps;
        var output = config.output;
        var xlist = config.exclude;

        var buffer = 'require(["' + deps.
            filter(function (lib) {
                return xlist.indexOf(lib) === -1;
            }).
            join('","') + '"]);';

        grunt.file.write(output, buffer);
    });

    var loaders = {
            almond: "client/components/almond/almond.js",
            cajon: "client/components/cajon/cajon.js",
            requirejs: "client/components/requirejs/require.js"
        };
    var defaults = {
            requireConfig: "client/requirejs.config.js",
            dirs: {
                src: __dirname + "/client",
                build: __dirname + "/client-build",
                debug: __dirname + "/client-debug",
                temp: __dirname + "/temp"
            },
            build: {
                amdloader: loaders.requirejs
            },
            debug: {
                amdloader: loaders.cajon
            }
        };
    var deps = ["q", "underscore", "backbone", "backbone.layoutmanager", "jquery"];
    var emptyDeps = deps.
        reduce(function (map, key) {
            map[key] = "empty:";
            return map;
        }, {});
    var config = {
            defaults: defaults,
            loaders: loaders,
            requirejs: {
                application: {
                    options: {
                        appDir: defaults.dirs.src + "/app",
                        baseUrl: "../app",
                        cjsTranslate: true,
                        dir: defaults.dirs.build + "/app",
                        findNestedDependencies: true,
                        keepBuildDir: true,
                        mainConfigFile: defaults.requireConfig,
                        optimize: "uglify",
                        useStrict: true,
                        modules: [
                            { name: "run" }
                        ],
                        paths: emptyDeps
                    }
                },
                components: {
                    options: {
                        baseUrl: defaults.dirs.src + "/app",
                        mainConfigFile: defaults.requireConfig,
                        cjsTranslate: false,
                        findNestedDependencies: true,
                        include: ["../../temp/requires"], //FIXME
                        keepBuildDir: true,
                        out: defaults.dirs.temp + "/components.js"
                    }
                }
            },
            min: {
                build: {
                    src: ["<%= defaults.build.amdloader %>", defaults.dirs.temp + "/components.js"],
                    dest: "<%= defaults.dirs.build %>/amdloader.js"
                },
                debug: {
                    src: ["<%= defaults.debug.amdloader %>", defaults.dirs.temp + "/components.js"],
                    dest: '<%= defaults.dirs.debug %>/amdloader.js'
                }
            },
            copy: {
                build: {
                    files: {
                        "<%= defaults.dirs.build %>/index.html": defaults.dirs.src + "/*.html"
                    }
                },
                debug: {
                    files: {
                        "<%= defaults.dirs.debug %>/index.html": defaults.dirs.src + "/*.html",
                        "<%= defaults.dirs.debug %>/app/": defaults.dirs.src + "/app/**/*"
                    }
                }
            },
            clean: {
                all: ["temp", "build", "debug"]
            },
            requires: {
                deps: deps,
                output: defaults.dirs.temp + "/requires.js",
                exclude: Object.keys(loaders)
            },
            watch: {
                client: {
                    files: [
                        defaults.dirs.src + "/*.html",
                        defaults.dirs.src + "/app/**/*"
                    ],
                    tasks: ["copy:debug"]
                }
            }
        };

    grunt.initConfig(config);

    /* Build final front end */
    grunt.registerTask(
        "build",
        "clean requirejs:application generate-requires:requires requirejs:components min:build copy:build"
        );

    /* Build debug front end */
    grunt.registerTask(
        "debug",
        "clean generate-requires:requires requirejs:components min:debug copy:debug watch"
        );
};
