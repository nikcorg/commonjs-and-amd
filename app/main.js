var Backbone = require("backbone");
var _ = require("underscore");
var Utils = require("utils");

function main() {
    var Model = Backbone.Model.extend({});
    var model = new Model({ hello: "world!" });

    console.log(Utils.reverse("fubar"));
    console.dir(model);
    console.dir(_.keys(model));

    try {
        Utils.throws();
    } catch (e) {
        console.error("Caught exception: " + e.message);
    }

    // Uncaught exception
    Utils.throws();
}

module.exports = main;
