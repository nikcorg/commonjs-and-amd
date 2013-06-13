var Backbone = require("backbone");

var Filters = module.exports = Backbone.View.extend({
    tagName: "form",
    template: "filters",
    events: {
        "change": "filterSelected"
    },
    filterValue: null,
    initialize: function () {
        if (!!this.collection) {
            this.listenTo(this.collection, "all", this.render);
        }
    },
    filterSelected: function (e) {
        if (!!e && e.target.value !== this.filterValue) {
            this.filterValue = e.target.value;
            this.trigger("filter:change", this.filterValue);
        }
    },
    afterRender: function () {
        this.$el.find("input:first").prop("checked", true).trigger("change");
    },
    serialize: function () {
        return !!this.collection ? {
            all: this.collection.length,
            pending: this.collection.pending().length,
            completed: this.collection.completed().length
        } : {};
    }
});
