var _ = require("underscore");
var Backbone = require("backbone");

var TaskForm = module.exports = Backbone.View.extend({
    tagName: "form",
    template: "addedit",
    events: {
        "submit": "onsubmit"
    },
    titleInput: null,
    onsubmit: function (e) {
        var reset = _.bind(this.reset, this);

        e.preventDefault();

        if (! this.model) {
            this.collection.create({ title: this.$titleInput.val() }, { wait: true, success: reset });
        } else {
            this.model.set({ title: this.$titleInput.val() }).save().then(reset);
        }
    },
    reset: function () {
        this.model = null;
        this.render();
    },
    edit: function (task) {
        this.model = task;
        this.render().then(function () {
            this.$titleInput.focus();
        });
    },
    serialize: function () {
        return this.model && _.extend(this.model.toJSON(), { action: "Edit" }) || { action: "Add" };
    },
    afterRender: function () {
        this.$titleInput = this.$el.find("input[name=title]");
        this.$titleInput.focus();
    }
});
