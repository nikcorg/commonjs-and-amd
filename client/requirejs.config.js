/*global window:false, require:true*/
var require = {
    paths: {
        "backbone": "../components/backbone/backbone",
        "layoutmanager": "../components/layoutmanager/backbone.layoutmanager",
        "jquery": "../components/jquery/jquery",
        "underscore": "../components/underscore/underscore",
        "q": "../components/q/q"
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
};
