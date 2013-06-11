/*global document:false*/
var Backbone = require("backbone");
var app = require("app");

app.views.filters.on("filter:change", function (filter) {
    if (filter in app.filters) {
        app.views.tasks.setFilter(app.filters[filter]);
    } else {
        app.views.tasks.clearFilter();
    }
});

app.views.tasks.on("task:edit", function (task) {
    app.views.form.edit(task);
});

app.container = new Backbone.Layout({
    el: document.body,
    template: "layout",
    views: {
        "#tasks": app.views.tasks,
        "#addedit": app.views.form,
        "#filters": app.views.filters
    }
});

app.collections.tasks.fetch().
then(function () {
    app.container.render();
}, function (e) {
    console.error(e.message);
});
