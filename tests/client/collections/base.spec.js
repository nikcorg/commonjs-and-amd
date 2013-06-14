var assert = require("assert");
var BaseCollection = require("collections/base");

describe("BaseCollection", function () {
    it("returns maxId = 0 for empty collection", function () {
        assert.equal(0, new BaseCollection().maxId());
    });

    it("returns maxId for non-empty collection", function () {
        assert.equal(3, new BaseCollection([{id:1},{id:2},{id:3},{id:-1}]).maxId());
    })
})
