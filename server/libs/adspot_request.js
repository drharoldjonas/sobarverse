var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var util = require("../utils");
var AdspotRequest = new Data('adspot_request');

AdspotRequest.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {from: 'adspots', localField: 'spot_id', foreignField: '_id', as: 'spot'}},
    {$unwind: {path: '$spot', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
  ];

  return this.__proto__.get.apply(this, [id, key]);
};

AdspotRequest.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};
  if (opts && opts.filters.status) opts.filters.status = opts.filters.status;

  opts.join = [
    {$lookup: {from: 'adspots', localField: 'spot_id', foreignField: '_id', as: 'spot'}},
    {$unwind: {path: '$spot', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
  ];

  if (opts && opts.sSearch) opts.join.push({$match: {'$or': [
        {'facility.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}},
        {'spot.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}},
        {'spot.placement': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}},
        {'company.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}},
      ]
    }});

  return this.__proto__.gets.apply(this, [opts]);
}

module.exports = AdspotRequest;
