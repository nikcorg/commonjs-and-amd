var Backbone = require("backbone");
var TaskModel = require("models/task");

module.exports = Backbone.Collection.extend({
    model: TaskModel,
    url: "/tasks"
});
