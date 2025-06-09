var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Profile = new Data('profiles');

module.exports = Profile;
