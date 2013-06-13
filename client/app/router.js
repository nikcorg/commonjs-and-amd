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

        app.filters.on("filter:change", function (filter) {
            router.navigate(filter.get("id"), { trigger: true });
        });

        app.views.tasks.on("task:edit", function (task) {
            app.views.form.edit(task);
        });

        app.container = new Backbone.Layout({
            template: "layout",
            views: {
                "#tasks": app.views.tasks,
                "#addedit": app.views.form,
                "#filters": app.views.filters
            }
        });

        app.collections.tasks.fetch({ reset: true }).
        then(function () {
            app.container.setElement(document.body).render().
            done(function () {
                Backbone.history.start();
            });
        }, function (err) {
            console.error("fetching tasks failed");
        });
    },
    pending: function () {
        var app = this.app;
        app.filters.activate("pending");
        app.views.tasks.setFilter(app.filters.active());
    },
    completed: function () {
        var app = this.app;
        app.filters.activate("completed");
        app.views.tasks.setFilter(app.filters.active());
    },
    all: function () {
        var app = this.app;
        app.filters.activate("all");
        app.views.tasks.clearFilter();
    },
    catchall: function () {
        this.navigate("all", { trigger: true });
    }
});
