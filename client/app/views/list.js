var Backbone = require("backbone");

module.exports = Backbone.Layout.extend({
    tagName: "ul",
    initialize: function () {
        this.options = this.options || {};

        if (! this.options.itemView) {
            throw new Error("itemView must be configured");
        }

        var View = this.options.itemView;
        this.insertViews(
            this.collection.map(function (model) {
                return new View({ model: model });
            })
        );
        this.collection.on("add", this.appendItemView, this);
        this.collection.on("remove", this.removeItemView, this);
    },
    appendItemView: function (model) {
        var View = this.options.itemView;
        this.insertView(new View({ model: model }));
    },
    removeItemView: function (model) {
        this.removeView(function (view) {
            return view.model === model;
        });
    }
});
