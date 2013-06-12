var BaseCollection = require("collections/base");
var TaskModel = require("models/task");

module.exports = BaseCollection.extend({
    model: TaskModel,
    url: "/tasks"
});
