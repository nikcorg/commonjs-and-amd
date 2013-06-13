var Backbone = require("backbone");

module.exports = Backbone.Layout.extend({
    tagName: "ul",
    filterBy: null,
    itemView: null,
    defaultFilter: function () {
        return true;
    },
    filter: function (model) {
        return this.filterBy && this.filterBy(model) || true;
    },
    initialize: function () {
        this.options = this.options || {};

        if (this.options.itemView) {
            this.itemView = this.options.itemView;
        }

        if (! this.itemView) {
            throw new Error("itemView must be configured");
        }

        this.collection.on("add", this.appendItemView, this);
        this.collection.on("remove", this.removeItemView, this);

        this.reset();
    },
    setFilter: function (fn) {
        if (typeof(fn) === "function") {
            this.filterBy = fn;
        }
        this.reset();
    },
    clearFilter: function () {
        this.filterBy = this.defaultFilter;
        this.reset();
    },
    reset: function () {
        this.removeView();
        this.collection.filter(this.filterBy || this.defaultFilter).map(this.appendItemView, this);
    },
    appendItemView: function (model) {
        var View = this.itemView;
        this.insertView(new View({ model: model })).render();
    },
    removeItemView: function (model) {
        this.removeView(function (view) {
            return view.model === model;
        });
    }
});
