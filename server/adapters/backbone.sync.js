var Q = require("q");
var FS = require("fs");
var FS_readFile = Q.nfbind(FS.readFile);

function setup(Backbone) {
    Backbone.sync = function (method, model, options) {
        var deferred = Q.defer();
        var file;
        var data;

        if (this.file || this.collection && this.collection.file) {
            file = this.file || this.collection && this.collection.file;

            switch (method) {
            case "create":
                deferred.reject(new Error("Not implemented (sync)"));
                break;

            case "read":
                FS_readFile(file, "utf-8").
                then(function (data) {
                    return JSON.parse(data);
                }).
                then(function (data) {
                    options.success(data, options);
                    deferred.resolve(model);
                }, function (e) {
                    deferred.reject(e);
                });
                break;

            case "update":
                deferred.reject(new Error("Not implemented (sync)"));
                break;

            case "delete":
                deferred.reject(new Error("Not implemented (sync)"));
                break;
            }
        } else {
            throw new Error("Storage not configured");
        }

        return deferred.promise;
    };
}

module.exports = {
    setup: setup
};
