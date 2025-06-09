var mongojs = require('mongojs');
var Promise = require("promise");
var Data = require("./data");
var Stats = new Data('stats');

module.exports = Stats;
