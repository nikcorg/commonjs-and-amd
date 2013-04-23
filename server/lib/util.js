var Q = require("q");

module.exports = {
    getRequestInput: function (req) {
        var deferred = Q.defer();
        var input = "";

        req.on("data", function (chunk) {
            input += String(chunk);
        }).on("end", function () {
            deferred.resolve(input);
        });

        return deferred.promise;
    }
};
