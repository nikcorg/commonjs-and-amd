var Backbone = require("backbone");

var TaskForm = module.exports = Backbone.View.extend({
    tagName: "form",
    template: "addedit",
    events: {
        "submit": "addTask"
    },
    titleInput: null,
    addTask: function (e) {
        e.preventDefault();

        this.collection.create({ title: this.$titleInput.val() });
        this.$titleInput.val("");
    },
    afterRender: function () {
        if (! this.$titleInput) {
            this.$titleInput = this.$el.find("input[name=title]");
        }
    }
});
