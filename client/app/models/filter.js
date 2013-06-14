var Backbone = require("backbone");

var Filter = module.exports = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        "id": null,
        "title": "Untitled",
        "propName": null,
        "propValue": null,
        "affects": 0,
        "active": false
    },
    watched: null,
    fn: null,
    initialize: function (attribs, options) {
        options = options || {};

        if (options.watch) {
            this.watched = options.watch;
            this.checkAffected();

            this.watched.on("reset", this.checkAffected, this);
            this.watched.on("add", this.checkAffected, this);
            this.watched.on("remove", this.checkAffected, this);
            this.watched.on("change", this.checkAffected, this);
        }
    },
    checkAffected: function () {
        var propName = this.get("propName");
        var propValue = this.get("propValue");

        if (this.watched && propName !== null) {
            var affected = this.watched.filter(this.filterFn());
            this.set("affects", affected.length);
        }
    },
    filterFn: function () {
        var fid = this.get("id");
        var propName = this.get("propName");
        var propValue = this.get("propValue");

        if (this.fn) {
            return this.fn;
        }

        if (propName !== null) {
            switch (propValue) {
            case Filter.ANY_VALUE:
                return function () {
                    return true;
                };

            case Filter.NOT_NULL:
                return function (m) {
                    return m.get(propName) != null;
                };

            case Filter.FALSY:
                return function (m) {
                    return !m.get(propName);
                };

            case Filter.TRUTHY:
                return function (m) {
                    return !!m.get(propName);
                };

            default:
                return function (m) {
                    return m.get(propName) === propValue;
                };
            }
        }
    }
});

// Assign some constants
Filter.ANY_VALUE = "any_value";
Filter.FALSY = "falsy";
Filter.TRUTHY = "truthy";
Filter.NOT_NULL = "not_null";
