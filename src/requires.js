/* This file is only for building the components monolith */
require(["jquery", "underscore", "q"], function ($, _, Q) {
    console.log("components", "jquery", "underscore", "q");

    require(["backbone"], function (Backbone) {
        console.log("components", "backbone");

        require(["backbone.layoutmanager"], function (Layout) {
            console.log("components", "layoutmanager");
        });
    });
});
