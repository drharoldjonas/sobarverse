var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Adspot = new Data('adspots');

Adspot.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.get.apply(this, [id, key]);
};

Adspot.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};

  opts.join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}}
  ];

  return this.__proto__.gets.apply(this, [opts]);
}

Adspot.available = function(placement){
  return new Promise(function(resolve, reject) {
      var stages = [];

      if(placement) stages.push({$match: {placement: placement}})
      stages.push({
        $lookup: {
          from: 'facilities', let: {facility_id: '$facility_id'},
          pipeline: [
            {$match: {$expr: {$eq: ['$_id', '$$facility_id']}}}
          ], as: 'facility'
        }
      })

      stages.push({$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}});
      stages.push({$match: {'facility.subscription_status': {$ne: 'active'}}});

      Adspot.db.aggregate(stages, function (err, result) {
        if (err) reject(err);

        if (result.length) resolve(result[0]);
        reject(new Error('No available Spots'))
      })
  })
};

Adspot.availableList = function(){
  return new Promise(function(resolve, reject) {
    var stages = [
      {$match: {'subscription_status': {$ne: 'active'}}}
    ];

    Adspot.db.aggregate(stages, function (err, result) {
      if (err) reject(err);

      if (result.length) resolve(result);
      reject(new Error('No available Spots'))
    })
  })
};

module.exports = Adspot;
