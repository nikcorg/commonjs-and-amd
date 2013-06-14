var assert = require("assert");
var Model = require("backbone").Model;
var Collection = require("backbone").Collection;
var Filter = require("models/filter");

// FIXME (maybe): Replace actual Models and collections with spies

describe("FilterModel", function () {
    it("returns filter function", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.ANY_VALUE
        });

        assert.ok(typeof(filter.filterFn()) === "function");
    });

    it("accepts any value", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.ANY_VALUE
        });

        [undefined, null, 0, -1, 2, "foo", "", NaN].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(filter.filterFn()(m));
        });
    });

    it("passes all non-null values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.NOT_NULL
        });

        [0, -1, 2, "foo", "", NaN].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(filter.filterFn()(m));
        });
    });

    it("fails for null values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.NOT_NULL
        });

        [undefined, null].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(! filter.filterFn()(m));
        });
    });

    it("matches truthy values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.TRUTHY
        });

        [true, 1, -1, [], "foo", {}].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(filter.filterFn()(m));
        });
    });

    it("fails non-truthy values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.TRUTHY
        });

        [false, "", 0, null, undefined].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(! filter.filterFn()(m));
        });
    });

    it("fails truthy values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.FALSY
        });

        [true, 1, -1, [], "foo", {}].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(! filter.filterFn()(m));
        });
    });

    it("passes non-truthy values", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: Filter.FALSY
        });

        [false, "", 0, null, undefined].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(filter.filterFn()(m));
        });
    });

    it("matches exactly", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: "value"
        });

        ["value"].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(filter.filterFn()(m));
        });
    });

    it("fails mismatches", function () {
        var filter = new Filter({
            id: "foo",
            propName: "prop",
            propValue: "value"
        });

        ["incorrect", null, "", -1, false, true, undefined, NaN].map(function (val) {
            return new Model().set(filter.get("propName"), val);
        }).forEach(function (m) {
            assert.ok(! filter.filterFn()(m));
        });
    });

    it("updates affects-value when collection changes", function () {
        var collection = new Collection([{prop:true},{prop:true},{prop:false}]);
        var filter = new Filter({
            id: "truthy",
            propName: "prop",
            propValue: Filter.TRUTHY
        }, { watch: collection });
        var affected = filter.get("affects");

        collection.add({prop:true});

        assert.ok(affected < filter.get("affects"));
    });
});
