var Backbone = require("backbone");

var Filters = module.exports = Backbone.View.extend({
    tagName: "form",
    template: "filters",
    events: {
        "change": "filterSelected"
    },
    filterValue: null,
    filterSelected: function (e) {
        if (!!e) {
            this.filterValue = e.target.value;
        }
        this.trigger("filter:change", this.filterValue);
    },
    afterRender: function () {
        this.$el.find("input:first").prop("checked").trigger("change");
    }
});
