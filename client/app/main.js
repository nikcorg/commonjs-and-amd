/*global document:false*/
var Backbone = require("backbone");

var app = require("app");

var Tasks = require("collections/tasks");
var Task = require("models/task");

var ListView = require("views/list");
var TaskView = require("views/task");
var TaskForm = require("views/taskform");
var Filters = require("views/filters");

app.filters = {
    completed: function (model) {
        return model.get("completed");
    },
    pending: function (model) {
        return ! model.get("completed");
    }
};

app.tasks = new Tasks();
app.tasksView = new ListView({ itemView: TaskView, collection: app.tasks });
app.tasksForm = new TaskForm({ collection: app.tasks });
app.tasksFilter = new Filters();

app.tasksFilter.on("filter:change", function (filter) {
    if (filter in app.filters) {
        app.tasksView.setFilter(app.filters[filter]);
    } else {
        app.tasksView.clearFilter();
    }
});

app.container = new Backbone.Layout({
    el: document.body,
    template: "layout",
    views: {
        "#tasks": app.tasksView,
        "#taskform": app.tasksForm,
        "#filters": app.tasksFilter
    }
});

app.tasks.fetch().
then(function () {
    app.container.render();
}, function (e) {
    console.error(e.message);
});
