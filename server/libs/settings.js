/*
* Settings class
* description: Responsible for storing the systems settings values
 */

var mongojs = require('mongojs');
var Settings = global.db.collection('settings');
var Promise = require("promise");

Settings.id = "";
Settings.settings = {};

Settings.loadData = function(){
  return new Promise(function(resolve, reject) {
    Settings.findOne({}, function (err, result) {
      if(err) return reject(err);

      if (!result) return reject(new Error('No Settings Found'));

      Settings.settings = result;
      Settings.id = result._id;

      resolve(result)

    }.bind(this));
  })
}

Settings.load = function(callback){
    //Loads the settings data
    this.findOne({}, function(err, result){
        //Handle the results
        if(!result){
            //Add the default settings
            if(callback) callback(err, false);
        } else {
            this.settings = result;
            this.id = result._id;

            if (callback) callback(err, result);
        }
    }.bind(this));
}

Settings.save = function(callback){
    //Saves the data to the db
    this.count({}, function(err, count) {
        if(!count) {
            this.insert(this.settings, function (err, result) {
                //Handle the results
                console.log(result);
                if (callback) callback(err, result);
            }.bind(this));
        } else {
            this.update({}, {$set: this.settings}, function (err, result) {
                //Handle the results
                console.log(result);
                if (callback) callback(err, result);
            }.bind(this));
        }
    }.bind(this));
}

module.exports = Settings;
