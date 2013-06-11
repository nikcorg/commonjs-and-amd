var Backbone = require("backbone");

module.exports = Backbone.Layout.extend({
    tagName: "li",
    template: "task",
    className: "",
    events: {
        "click .done": "toggleCompleted",
        "click .delete": "destroy",
        "dblclick": "edit"
    },
    initialize: function () {
        this.model.on("change", this.render, this);
    },
    edit: function (e) {
        this.trigger("task:edit", this.model);
    },
    beforeRender: function () {
        if (this.model.get("completed")) {
            this.$el.addClass("completed");
        } else {
            this.$el.removeClass("completed");
        }
    },
    destroy: function () {
        this.model.destroy();
    },
    serialize: function () {
        return this.model.toJSON();
    },
    toggleCompleted: function (e) {
        e.preventDefault();
        this.model.set("completed", !this.model.get("completed"));
        this.model.save();
    }
});
