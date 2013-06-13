var ListView = require("views/list");
var FilterView = require("views/filter");

var FilterListView = module.exports = ListView.extend({
    tagName: "form",
    itemView: FilterView
});
