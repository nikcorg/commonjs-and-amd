var Config = require("configure");
var Backbone = require("backbone");

var Filter = require("models/filter");
var Filters = require("collections/filters");
var FilterList = require("views/filterlist");

var Task = require("models/task");
var Tasks = require("collections/tasks");
var TaskForm = require("views/addedit");
var TaskListView = require("views/tasklist");

var tasks = new Tasks();
var filters = new Filters();

filters.add(new Filter({
    id: "all",
    title: "All",
    propName: "id",
    propValue: Filter.NOT_NULL
}, { watch: tasks }));

filters.add(new Filter({
    id: "pending",
    title: "Pending",
    propName: "completed",
    propValue: Filter.FALSY
}, { watch: tasks }));

filters.add(new Filter({
    id: "completed",
    title: "Completed",
    propName: "completed",
    propValue: Filter.TRUTHY
}, { watch: tasks }));

var tasksView = new TaskListView({ collection: tasks });
var tasksForm = new TaskForm({ collection: tasks });
var tasksFilter = new FilterList({ collection: filters });

var app = module.exports = {
    collections: {
        tasks: tasks
    },
    views: {
        tasks: tasksView,
        form: tasksForm,
        filters: tasksFilter
    },
    filters: filters
};
