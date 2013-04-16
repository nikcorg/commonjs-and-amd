/*global module:false*/
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
            almond: "src/components/almond/almond.js",
            cajon: "src/components/cajon/cajon.js",
            requirejs: "src/components/requirejs/require.js"
        };
    var defaults = {
            amdloader: "src/components/requirejs/require.js",
            requireConfig: "src/requirejs.config.js",
            dirs: {
                build: "build",
                debug: "debug",
                temp: "temp"
            },
            build: {
                amdloader: loaders.requirejs
            },
            debug: {
                amdloader: loaders.cajon
            }
        };
    var deps = Object.keys(require("./component.json").dependencies);
    var emptyDeps = deps.
        filter(function (key) {
            return Object.keys(loaders).indexOf(key) === -1;
        }).
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
                        appDir: "src/app",
                        baseUrl: "../app",
                        cjsTranslate: true,
                        dir: defaults.dirs.build + "/app",
                        findNestedDependencies: true,
                        keepBuildDir: true,
                        mainConfigFile: defaults.requireConfig,
                        optimize: "none",
                        useStrict: true,
                        modules: [
                            { name: "run" }
                        ],
                        paths: emptyDeps
                    }
                },
                components: {
                    options: {
                        baseUrl: "src/app",
                        mainConfigFile: defaults.requireConfig,
                        cjsTranslate: false,
                        findNestedDependencies: true,
                        include: ["../../temp/requires"],
                        keepBuildDir: true,
                        logLevel: 1,
                        out: "temp/components.js"
                    }
                }
            },
            min: {
                build: {
                    src: ["<%= defaults.build.amdloader %>", "temp/components.js"],
                    dest: "<%= defaults.dirs.build %>/amdloader.js",
                    logLevel: 1
                },
                debug: {
                    src: ["<%= defaults.debug.amdloader %>", "temp/components.js"],
                    dest: '<%= defaults.dirs.debug %>/amdloader.js',
                    logLevel: 1
                }
            },
            copy: {
                build: {
                    files: {
                        "<%= defaults.dirs.build %>/index.html": "src/*.html"
                    }
                },
                debug: {
                    files: {
                        "<%= defaults.dirs.debug %>/index.html": "src/*.html",
                        "<%= defaults.dirs.debug %>/app/": "src/app/**/*"
                    }
                }
            },
            clean: {
                all: ["temp", "build", "debug"]
            },
            requires: {
                deps: ["q", "underscore", "backbone", "backbone.layoutmanager", "jquery"],
                output: defaults.dirs.temp + "/requires.js",
                exclude: Object.keys(loaders)
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
        "clean generate-requires:requires requirejs:components min:debug copy:debug"
        );
};
