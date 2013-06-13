var ListView = require("views/list");
var TaskView = require("views/task");

var TaskListView = module.exports = ListView.extend({
    itemView: TaskView
});
