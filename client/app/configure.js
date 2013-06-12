var Backbone = require("backbone");
var Q = require("q");
var Handlebars = require("handlebars");
var JST = {};

Backbone.Layout.configure({
    manage: true,
    fetch: function (path) {
        // Initialize done for use in async-mode
        var done;

        path = "app/templates/" + path + ".html";

        // If the template has not been loaded yet
        if (! JST[path]) {
            done = this.async();

            return Q(Backbone.$.ajax({ url: path })).
            then(function (contents) {
                JST[path] = Handlebars.compile(contents);
                JST[path].__compiled__ = true;
                done(JST[path]);
            });
        } else

        // If the template is present but not yet compiled
        if (! JST[path].__compiled__) {
            JST[path] = Handlebars.template(JST[path]);
            JST[path].__compiled__ = true;
        }

        return JST[path];
    }
});

Backbone.ajax = function (options) {
    if (options.contentType && options.contentType === "application/json") {
        options.contentType += "; charset=utf-8";
    }

    return Q(Backbone.$.ajax(options));
};
