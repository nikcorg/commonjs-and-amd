var assert = require("assert");
var Filters = require("collections/filters");
var Filter = require("models/filter");

describe("FiltersCollection", function () {
    it("throws if empty when queried for active", function () {
        var filters = new Filters();
        assert.throws(filters.active);
    });

    it("activates first added filter", function () {
        var filters = new Filters();
        var filter = new Filter({ id: "dummy" });

        filters.add(filter);

        assert.equal(filter.filterFn(), filters.active());
    });

    it("activates based on id", function () {
        var fooFilter = new Filter({ id: "foo" });
        var barFilter = new Filter({ id: "bar" });
        var filters = new Filters([fooFilter, barFilter]);

        assert.equal(barFilter.filterFn(), filters.activate("bar"));
        assert.equal(barFilter.filterFn(), filters.active());
    });
});
