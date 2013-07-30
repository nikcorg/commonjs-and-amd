var Backbone = require("backbone");

var FilterView = module.exports = Backbone.View.extend({
    tagName: "label",
    template: "filter",
    events: {
        "click input": "activate"
    },
    initialize: function () {
        this.listenTo(this.model, "all", this.render);
    },
    activate: function () {
        this.model.set("active", true);
    },
    serialize: function () {
        return {
            id: this.model.get("id"),
            title: this.model.get("title"),
            active: this.model.get("active"),
            affects: this.model.get("affects")
        };
    }
});
