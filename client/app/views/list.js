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
        this.collection.on("reset", this.reset, this);

        if (this.collection.length > 0) {
            this.reset();
        }
    },
    setFilter: function (fn) {
        if (typeof(fn) === "function" && fn !== this.filterBy) {
            this.filterBy = fn;
            this.reset();
        }
    },
    clearFilter: function () {
        if (this.filterBy !== null) {
            this.filterBy = this.defaultFilter;
            this.reset();
        }
    },
    reset: function () {
        this.removeView();
        this.appendItemView(this.collection.filter(this.filterBy || this.defaultFilter));
    },
    beforeRender: function () {
        if (this.collection.length > this.getViews().value().length) {
            this.reset();
        }
    },
    appendItemView: function (models) {
        var View = this.itemView, views;

        if (!("length" in models)) {
            models = [models];
        }

        views = models.map(function (model) {
            return new View({ model: model });
        });

        this.insertViews(views);

        views.forEach(function (v) {
            v.render();
        });
    },
    removeItemView: function (model) {
        this.removeView(function (view) {
            return view.model === model;
        });
    }
});
