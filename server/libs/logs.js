var mongojs = require('mongojs');
var Promise = require("promise");
var Data = require("./data");
var Logs = new Data('logs');

module.exports = Logs;