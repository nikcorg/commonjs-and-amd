require.config({
    baseUrl: "app",
    paths: {
        "backbone": "../components/backbone/backbone",
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
        "underscore": {
            exports: "_"
        },
        "backbone.layoutmanager": {
            deps: ["backbone"],
            exports: "Backbone"
        }
    }
});

define(
    [
        "domReady",
        // All libs should be included, as this file is used as basis for the components monolith
        "backbone",
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
