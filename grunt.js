module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");
    grunt.loadNpmTasks("grunt-contrib-copy");

    var defaults = {
            amdloader: "src/components/cajon/cajon.js",
            application: {
                appDir: "src/app",
                baseUrl: "../app",
                cjsTranslate: true,
                dir: "build/app",
                findNestedDependencies: true,
                keepBuildDir: true,
                mainConfigFile: "src/requirejs.config.js",
                optimize: "none",
                useStrict: true,
                modules: [
                    { name: "run" }
                ],
                paths: {
                    "backbone": "empty:",
                    "backbone.layoutmanager": "empty:",
                    "jquery": "empty:",
                    "q": "empty:",
                    "underscore": "empty:"
                }
            },
            components: {
                baseUrl: "src/app",
                mainConfigFile: "src/requirejs.config.js",
                cjsTranslate: false,
                findNestedDependencies: true,
                include: ["../requires.js"],
                keepBuildDir: true,
                out: "temp/components.js"
            }
        };
    var config = {
            defaults: defaults,
            requirejs: {
                release: {
                    options: "<config:defaults.application>"
                },
                components: {
                    options: "<config:defaults.components>"
                }
            },
            min: {
                release: {
                    src: ["<config:defaults.amdloader>", "temp/components.js"],
                    dest: "build/amdloader.js",
                    logLevel: 1
                }
            },
            copy: {
                release: {
                    files: {
                        "build/": "src/*.html"
                    }
                }
            }
        };

    grunt.initConfig(config);
    grunt.registerTask("build", "requirejs:release requirejs:components min copy");
};

