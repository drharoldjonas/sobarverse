// var mongojs = require('mongojs');
// var Promise = require("promise");
var Data = require("./data");
// var Menu = global.db.collection('menus');
var Promise = require("promise");
var Menu = new Data('menus');

// Menu.id = "";
// Menu.menus = {};

// Menu.loadData = function() {
//   return new Promise(function(resolve, reject) {
//     Menu.findOne({}, function (err, result) {
//       if(err) return reject(err);
//
//       if (!result) return reject(new Error('No Menus Found'));
//
//       Menu = result;
//       Menu.id = result._id;
//
//       resolve(result)
//
//     }.bind(this));
//   })
// }
// Menu.load = function() {
//   return new Promise((resolve, reject) => {
//     Menu.find({}, function (err, result) {
//       if(err) return reject(err);
//       if (!result) return reject(new Error('No Menus Found'));
//
//       resolve(result)
//     }.bind(this))
//   })
// }
// Menu.save = function(callback) {
//   //Saves the data to the db
//   this.count({}, function(err, count) {
//     if(!count) {
//       this.insert(this.menus, function (err, result) {
//         //Handle the results
//         console.log(result);
//         if (callback) callback(err, result);
//       }.bind(this));
//     } else {
//       this.update({}, {$set: this.menus}, function (err, result) {
//         //Handle the results
//         console.log(result);
//         if (callback) callback(err, result);
//       }.bind(this));
//     }
//   }.bind(this));
// }

module.exports = Menu;
