var core = require("core");
var Q = require("q");

module.exports = {
    Model: core.Model.extend({
        defaults: {
            include: "bus"
        },
        fubar: function () {
            var defer = Q.defer();
            // Because we use dynamic includes, we need to trick r.js. Otherwise
            // this modules will be incorrectly converted/wrapped.
            var include = require;

            if (typeof(define) === "function" && define.amd) {
                include(["sub/" + this.get("include")], function (inc) {
                    defer.resolve(inc.drive());
                });
            } else {
                defer.resolve(include("sub/" + this.get("include")).drive())
            }

            return defer.promise;
        }
    }),
    echo: function (str) {
        return core.echo(str);
    }
};
