var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Country = new Data('countries');

module.exports = Country;