var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Audit = new Data('audits');

module.exports = Audit;