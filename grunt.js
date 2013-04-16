module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");

    var defaults = {
            amdloader: "components/cajon/cajon.js",
            application: {
                appDir: "app",
                baseUrl: "../app",
                cjsTranslate: true,
                dir: "app-build/app",
                findNestedDependencies: true,
                include: ["run"],
                insertRequire: ["run"],
                keepBuildDir: true,
                //logLevel: 1,
                mainConfigFile: "requirejs.config.js",
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
                baseUrl: "app",
                mainConfigFile: "requirejs.config.js",
                cjsTranslate: false,
                findNestedDependencies: true,
                include: ["components"],
                keepBuildDir: true,
                //logLevel: 1,
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
                    dest: "app-build/amdloader.js",
                    logLevel: 1
                }
            }
        };

    grunt.initConfig(config);
    grunt.registerTask("build", "requirejs:release requirejs:components min");
};

