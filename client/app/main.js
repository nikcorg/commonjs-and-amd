/*global document:false*/
var Backbone = require("backbone");
var Router = require("router");

var app, router;

Backbone.$(document).ready(function () {
    console.log("doc ready");

    app = require("app");
    router = new Router({app: app});
});
