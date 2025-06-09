var Data = require("./data");
var Subscription = new Data('subscriptions');
var util = require('../utils');

Subscription.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'packages', localField: 'package_id', foreignField: '_id', as: 'package'}},
    {$unwind: {path: '$package', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.get.apply(this, [id, key]);
};

Subscription.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};

  opts.join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'packages', localField: 'package_id', foreignField: '_id', as: 'package'}},
    {$unwind: {path: '$package', preserveNullAndEmptyArrays: true}}
  ];

  if (opts && opts.sSearch) opts.join.push({$match: {'facility.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}}});

  return this.__proto__.gets.apply(this, [opts]);
}

module.exports = Subscription;
