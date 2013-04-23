require.config({
    baseUrl: "app",
    paths: {
        "backbone": "../components/backbone/backbone",
        "handlebars": "../components/handlebars/handlebars",
        "domReady": "../components/requirejs-domready/domReady",
        "jquery": "../components/jquery/jquery",
        "layoutmanager": "../components/layoutmanager/backbone.layoutmanager",
        "q": "../components/q/q",
        "underscore": "../components/underscore/underscore"
    },
    shim: {
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "backbone.layoutmanager": {
            deps: ["backbone"],
            exports: "Backbone"
        },
        "handlebars": {
            exports: "Handlebars"
        },
        "underscore": {
            exports: "_"
        }
    }
});

define(
    [
        "domReady",
        // All libs should be included, as this file is used as basis for the components monolith
        "backbone",
        "handlebars",
        "jquery",
        "layoutmanager",
        "q",
        "underscore"
    ],
    function (domReady) {
        domReady(function () {
            require(["main"]);
        });
    }
);
