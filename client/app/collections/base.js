var Backbone = require("backbone");

var BaseCollection = module.exports = Backbone.Collection.extend({
    maxId: function () {
        if (this.length === 0) {
            return 0;
        }
        return Math.max.apply(Math, this.pluck("id"));
    }
});
