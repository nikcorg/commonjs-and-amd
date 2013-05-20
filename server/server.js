/*global __dirname:false, process:false*/
var Q = require("q");
var Backbone = require("backbone");

require("./adapters/backbone.sync").setup(Backbone);
require("./adapters/backbone.fetch").setup(Backbone);

var util = require("./lib/util");
var express = require("express");
var app = express();

var Tasks = require("collections/tasks");
Tasks.prototype.file = __dirname + "/data/tasks.json";

var tasks = new Tasks();

var staticOptions = {
    debug: {},
    build: { maxAge: 600 * 1000 }
};

app.configure(function() {
    app.set("port", process.env.PORT || 3000);
    app.use(express.logger("dev"));

    app.use(express.compress());
    app.use(express.static(process.env.STATIC, staticOptions[process.env.ENV] || {}));
});


app.get("/tasks/:id", function (req, res) {
    tasks.fetch().
    timeout(500).
    then(function (tasks) {
        res.send(tasks.get(req.params("id")).toJSON());
    }, function (e) {
        res.send(500, e.message);
    }).
    done();
});

app.put("/tasks/:id", function (req, res) {
    var data, task;

    data = util.getRequestInput(req).
    then(function (input) {
        return JSON.parse(input);
    });

    task = tasks.fetch().
    then(function (tasks) {
        return tasks.get(req.param("id"));
    });

    Q.when([data, task]).
    timeout(500).
    spread(function (data, task) {
        return task.set(data);//.save();
    }).then(function (task) {
        res.send(200, task.toJSON());
    }, function (e) {
        res.send(500, e.message);
    }).
    done();
});

app.get("/tasks", function (req, res) {
    tasks.fetch().
    timeout(500).
    then(function (tasks) {
        res.send(tasks.toJSON());
    }, function (e) {
        res.send(500, e.message);
    }).
    done();
});

app.post("/tasks", function (req, res) {
    var data, task;

    data = util.getRequestInput(req).
    then(function (input) {
        return JSON.parse(input);
    });

    Q.when([tasks.fetch(), data]).
    timeout(500).
    spread(function (tasks, data) {
        return tasks.add(data);
    }).
    then(function (tasks) {
        res.send(201, tasks.toJSON());
    }, function (e) {
        res.send(500, e.message);
    }).
    done();
});

app.delete("/tasks/:id", function (req, res) {
    tasks.fetch().
    then(function (tasks) {
        return tasks.get(req.param("id"));
    }).
    then(function (task) {
        return tasks.remove(task);
    }).
    then(function () {
        res.send(200, tasks.toJSON());
    }, function (e) {
        res.send(500, e.message);
    });
});

app.listen(app.get("port"), function() {
    console.info("Express server listening on port", app.get("port"));
});
