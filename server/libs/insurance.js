var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Insurance = new Data('insurances');

module.exports = Insurance;
