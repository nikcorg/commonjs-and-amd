var Backbone = require("backbone");

var BaseCollection = module.exports = Backbone.Collection.extend({
    maxId: function () {
        return Math.max.apply(Math, this.pluck("id"));
    }
});
