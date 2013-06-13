var BaseCollection = require("collections/base");
var FilterModel = require("models/filter");

var FilterCollection = module.exports = BaseCollection.extend({
    model: FilterModel,
    comparator: function (filter) {
        return filter.get("title");
    },
    activate: function (id) {
        var flt = id instanceof FilterModel ? id : this.get(id);

        this.off("change:active", this.activate, this);

        if (flt) {
            this.without(flt).forEach(function (f) {
                f.set("active", false);
            });
            flt.set("active", true);

            this.on("change:active", this.activate, this);
            this.trigger("filter:change", flt);

            return flt.filterFn();
        }

        throw new Error("Filter not found: " + id);
    },
    active: function () {
        var flt = this.where({ active: true });

        if (! flt) {
            throw new Error("No active filter");
        }

        return flt[0].filterFn();
    },
    initialize: function () {
        if (this.length > 0) {
            this.activate(this.at(0));
        } else {
            this.once("add", this.activate, this);
        }
    }
});
