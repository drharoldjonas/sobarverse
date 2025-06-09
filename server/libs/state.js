var mongojs = require('mongojs');
var Promise = require("promise");
var Data = require("./data");
var State = new Data('states');

module.exports = State;