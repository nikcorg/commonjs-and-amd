var Backbone = require("backbone");

module.exports = Backbone.Layout.extend({
    tagName: "ul",
    initialize: function () {
        this.options = this.options || {};

        if (! this.options.itemView) {
            throw new Error("itemView must be configured");
        }

        this.collection.map(this.appendItemView, this);
        this.collection.on("add", this.appendItemView, this);
        this.collection.on("remove", this.removeItemView, this);
    },
    appendItemView: function (model) {
        var View = this.options.itemView;
        this.insertView(new View({ model: model })).render();
    },
    removeItemView: function (model) {
        this.removeView(function (view) {
            return view.model === model;
        });
    }
});
