var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
    idAttribute: "id",
    defaults: {
        completed: false,
        title: ""
    },
    url: function () {
        var url = "/tasks";
        if (this.id) {
            url += "/" + this.id;
        }
        return url;
    }
});
