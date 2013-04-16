var Backbone = require("backbone");

module.exports = {
    Model: Backbone.Model.extend({}),
    echo: function (str) {
        return str;
    }
};
