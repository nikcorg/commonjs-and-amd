module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-requirejs");

    var defaults = {
            requirejs: {
                baseUrl: "app",
                name: "../components/almond/almond",
                mainConfigFile: "app/requirejs.config.js",
                include: ["run"],
                insertRequire: ["run"],
                optimize: "none",
                out: "app/single.js",
                findNestedDependencies: true,
                useStrict: true,
                cjsTranslate: true,
                logLevel: 1
            }
        };
    var config = {
            defaults: defaults,
            requirejs: {
                release: {
                     options: '<config:defaults.requirejs>'
                 }
            }
        };

    grunt.initConfig(config);
    grunt.registerTask("build", "requirejs:release");
}

