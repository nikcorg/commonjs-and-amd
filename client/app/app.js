var Config = require("configure");
var Backbone = require("backbone");

var ListView = require("views/list");
var Filters = require("views/filters");

var Task = require("models/task");
var Tasks = require("collections/tasks");
var TaskView = require("views/task");
var TaskForm = require("views/addedit");

var tasks = new Tasks();
var tasksView = new ListView({ itemView: TaskView, collection: tasks });
var tasksForm = new TaskForm({ collection: tasks });
var tasksFilter = new Filters();

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
