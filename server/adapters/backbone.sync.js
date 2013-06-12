var Q = require("q");
var FS = require("fs");
var FS_readFile = Q.nfbind(FS.readFile);

function setup(Backbone) {
    Backbone.sync = function (method, model, options) {
        var deferred = Q.defer();
        var file;
        var data;
        var collection;

        if (options.collection) {
            collection = options.collection;
        } else if (model instanceof Backbone.Collection) {
            collection = model;
        } else if (model instanceof Backbone.Model) {
            collection = model.collection;
        }

        if (collection && collection.file) {
            file = collection.file;

            switch (method) {
            case "create":
                data = model.toJSON();

                if (model.isNew()) {
                    data[model.idAttribute] = collection.maxId() + 1;
                }

                // TODO: Write new items to disk
                options.success(data, options);
                deferred.resolve(model);
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
                deferred.reject(new Error("Not implemented (sync/update)"));
                break;

            case "delete":
                deferred.reject(new Error("Not implemented (sync/delete)"));
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
