var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Company = new Data('companies');

Company.get = function(id, key){
  //Get the data
  this._join = [
    {$lookup: {
        from: 'stats', let: {company_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$company_id', '$$company_id']}}},
          {$count: 'count'}
        ], as: "facilities"
      }
    },
    {$unwind:{path:'$facilities', preserveNullAndEmptyArrays:true}}
  ];

  return this.__proto__.get.apply(this, [id, key]);
}

Company.gets = function(opts){
  //Get the data

  opts = opts || {};
  if (!opts.filters) opts.filters = {};

  opts.join = [
    {$lookup: {
        from: 'facilities', let: {company_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$company_id', '$$company_id']}}},
          {$count: 'count'}
        ], as: "facilities"
      }
    },
    {$unwind:{path:'$facilities', preserveNullAndEmptyArrays:true}},
  ];

  return this.__proto__.gets.apply(this, [opts]);
};

Company.check = function(name) {
  return new Promise(function(resolve, reject){
    Company.db.findOne({name: new RegExp(["^", name, "$"].join(""), "i")}, function (err, result) {
      if(err) reject(err)

      resolve(result)
    })
  })
};

module.exports = Company;
