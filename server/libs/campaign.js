var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Campaign = new Data('campaigns');

module.exports = Campaign;
