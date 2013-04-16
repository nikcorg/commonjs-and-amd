var main = require("main");
var outer = require("outer");
var dynamic = new outer.Model({foo:"bar"});
var Backbone = require("backbone");

require("backbone.layoutmanager");

console.log("Application running...");
console.log("BB.LM", Backbone.Layout);

dynamic.fubar().
then(function (msg) {
    console.log("msg=",msg);
}, function (e) {
    console.error("fubar=", e.message);
}).done();

try {
    console.log(outer.echo("echo echo"));
} catch (e) {
    console.error("Caught in runner: " + e.message);
}
