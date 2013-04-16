var inner = require("inner");

module.exports = {
    Model: inner.Model.extend({}),
    echo: function (str) {
        return inner.echo(str);
    }
};
