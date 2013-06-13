/*global document:false*/
var Backbone = require("backbone");
var Router = require("router");

Backbone.$(document).ready(function () {
    var app = require("app");
    app.router = new Router({app: app});
});
