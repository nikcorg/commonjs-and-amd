var bus = require("sub/bus");
var utils = require("utils");
var main = require("main");

try {
    main(bus);
} catch (e) {
    console.error("Caught in runner: " + e.message);
}
