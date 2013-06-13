var Backbone = require("backbone");
var Q = require("q");

var Router = module.exports = Backbone.Router.extend({
    routes: {
        "pending": "pending",
        "completed": "completed",
        "all": "all",
        "*splat": "catchall"
    },
    app: null,
    initialize: function (options) {
        var router = this;
        var app = options.app;

        this.app = app;

        app.views.filters.on("filter:change", function (filter) {
            // if (filter in app.filters) {
            //     app.views.tasks.setFilter(app.filters[filter]);
            // } else {
            //     app.views.tasks.clearFilter();
            // }
            router.navigate(filter, { trigger: true });
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

        console.log("fetch");
        app.collections.tasks.fetch({ reset: true }).
        then(function () {
            app.container.render().
            done(function () {
                console.log("render done");
                console.log("start=", Backbone.history.start());
            }).fail(function () {
                console.log("render fail");
            });
        }, function (err) {
            console.error("fetchin tasks failed");
        });
    },
    pending: function () {
        var app = this.app;
        app.views.tasks.setFilter(app.filters.pending);
    },
    completed: function () {
        var app = this.app;
        app.views.tasks.setFilter(app.filters.completed);
    },
    all: function () {
        var app = this.app;
        app.views.tasks.clearFilter();
    },
    catchall: function () {
        this.navigate("all", { trigger: true });
    }
});
