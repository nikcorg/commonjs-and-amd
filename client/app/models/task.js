var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
    urlRoot: "/tasks",
    idAttribute: "id",
    defaults: {
        completed: false,
        title: ""
    },
    toggleCompleted: function () {
        return this.set("completed", ! this.get("completed"));
    }
});
