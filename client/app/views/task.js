var Backbone = require("backbone");

module.exports = Backbone.Layout.extend({
    tagName: "li",
    template: "task",
    className: "",
    events: {
        "click .done": "toggleCompleted",
        "click .delete": "destroy",
        "dblclick .title": "edit",
        "keydown .title": "saveOnEnter"
    },
    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },
    edit: function (e) {
        // this.trigger("task:edit", this.model);
        this.$el.find(".title").attr("contenteditable", "true");
    },
    saveOnEnter: function (e) {
        switch (e.keyCode) {
        case 13: // Enter
            this.model.set("title", this.$el.find(".title").removeAttr("contenteditable").text()).save();
            break;

        case 27: // Escape
            this.$el.find(".title").html(this.model.get("title")).removeAttr("contenteditable");
            break;
        }
    },
    beforeRender: function () {
        if (this.model.get("completed")) {
            this.$el.addClass("completed");
        } else {
            this.$el.removeClass("completed");
        }
    },
    destroy: function () {
        this.model.destroy({ wait: true });
    },
    serialize: function () {
        return this.model.toJSON();
    },
    toggleCompleted: function (e) {
        e.preventDefault();
        this.model.set("completed", !this.model.get("completed")).save();
    }
});
