var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Contact = new Data('contacts');

Contact.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.get.apply(this, [id, key]);
}

Contact.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};

  opts.join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.gets.apply(this, [opts]);
}

module.exports = Contact;
