var mongojs = require('mongojs');
var Promise = require("promise");
var Data = require("./data");
var Role = new Data('roles');

module.exports = Role;