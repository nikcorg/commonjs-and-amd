var assert = require("assert");
var Task = require("models/task");

describe("TaskModel", function () {
    it("has the id as the url suffix", function () {
        var task = new Task({"id":"1", "title":"Lorem ipsum"});
        assert.equal("/tasks/1", task.url());
    });

    it("has no id when unsaved", function () {
        var task = new Task();
        assert.equal(undefined, task.id);
    });
});
