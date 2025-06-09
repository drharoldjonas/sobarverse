var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Inquiry = new Data('inquiries');

Inquiry.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.get.apply(this, [id, key]);
}

Inquiry.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};
  if (opts && opts.filters.status) opts.filters.status = opts.filters.status;
  if (opts && opts.filters.facility_id) opts.filters.facility_id = mongojs.ObjectId(opts.filters.facility_id);

  opts.join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}}
  ];

  if (opts && opts.sSearch) opts.join.push({$match: {'facility.name': {$regex: new RegExp(opts.sSearch, 'i')}}});

  return this.__proto__.gets.apply(this, [opts]);
}

module.exports = Inquiry;
