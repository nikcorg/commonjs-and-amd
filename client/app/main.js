/*global document:false*/
var Backbone = require("backbone");

var app = require("app");

var Tasks = require("collections/tasks");
var Task = require("models/task");

var ListView = require("views/list");
var TaskView = require("views/task");
var TaskForm = require("views/taskform");

app.tasks = new Tasks();
app.tasksView = new ListView({ itemView: TaskView, collection: app.tasks });
app.tasksForm = new TaskForm({ collection: app.tasks });
app.container = new Backbone.Layout({
    el: document.body,
    template: "layout",
    views: {
        "#tasks": [app.tasksView],
        "#taskform": [app.tasksForm]
    }
});

app.tasks.fetch().
then(function () {
    app.container.render();
}, function (e) {
    console.error(e.message);
});
