var BaseCollection = require("collections/base");
var TaskModel = require("models/task");

module.exports = BaseCollection.extend({
    model: TaskModel,
    url: "/tasks",
    pending: function () {
        return this.where({ completed: false });
    },
    completed: function () {
        return this.where({ completed: true });
    },
    comparator: function (task) {
        return task.get("title");
    }
});
