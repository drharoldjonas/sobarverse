var mongojs = require('mongojs');
var Promise = require("promise");
var Data = require("./data");
var Package = new Data('packages');

module.exports = Package;
