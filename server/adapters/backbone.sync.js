var Q = require("q");
var FS = require("fs");
var FS_readFile = Q.nfbind(FS.readFile);
var FS_writeFile = Q.nfbind(FS.writeFile);

function store(file, json) {
    return FS_writeFile(file, JSON.stringify(json));
}

function read(file) {
    return FS_readFile(file, "utf-8");
}

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
                model.set(model.idAttribute, collection.maxId() + 1);
                options.success(null, options);
                collection.add(model);

                store(file, collection.toJSON()).
                then(function () {
                    deferred.resolve(model);
                }, function (err) {
                    deferred.reject(err);
                });
                break;

            case "read":
                read(file).
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
                store(file, collection.toJSON()).
                then(function () {
                    deferred.resolve(model);
                }, function (err) {
                    deferred.reject(err);
                });
                break;

            case "delete":
                Q(collection.remove(model)).
                then(function (collection) {
                    return store(file, collection.toJSON());
                }).
                then(function () {
                    options.success();
                    deferred.resolve();
                }, function (err) {
                    deferred.reject(err);
                });
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
