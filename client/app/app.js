var Config = require("configure");
var Backbone = require("backbone");

var Filters = require("views/filters");

var Task = require("models/task");
var Tasks = require("collections/tasks");
var TaskForm = require("views/addedit");
var TaskListView = require("views/tasklist");

var tasks = new Tasks();
var tasksView = new TaskListView({ collection: tasks });
var tasksForm = new TaskForm({ collection: tasks });
var tasksFilter = new Filters({ collection: tasks });

var app = module.exports = {
    collections: {
        tasks: tasks
    },
    views: {
        tasks: tasksView,
        form: tasksForm,
        filters: tasksFilter
    },
    filters: {
        completed: function (model) {
            return model.get("completed");
        },
        pending: function (model) {
            return ! model.get("completed");
        }
    }
};
