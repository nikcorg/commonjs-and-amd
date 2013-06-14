var assert = require("assert");
var Tasks = require("collections/tasks");

describe("TasksCollection", function () {
    it("returns completed tasks", function () {
        var tasks = new Tasks([{completed:true},{completed:false},{completed:true}]);

        assert.equal(2, tasks.completed().length);
    });

    it("returns pending tasks", function () {
        var tasks = new Tasks([{completed:true},{completed:false},{completed:true}]);

        assert.equal(1, tasks.pending().length);
    })
});
