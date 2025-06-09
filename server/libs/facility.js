var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Transaction = require("./transaction");
var Facility = new Data('facilities');

Facility.loadData = function (){
  return new Promise((resolve) => {
    Facility.db.count({}, (err, count) => {
      if (err) console.log('Meeting Count: ', err)
      resolve(count)
    })
  })
}

Facility.list = function(opts){
  opts = opts || {};
  if (!opts.filters) opts.filters = {};
  if (opts && opts.filters.state) opts.filters.company_id = mongojs.ObjectId(opts.filters.company_id);
  if (opts && opts.filters.status) opts.filters.status = opts.filters.status;

  opts.join = [
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
    {$lookup: {
        from: 'adspots', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$and : [
                {$expr: {$eq: ['$status', 'active']}},
                {$expr: {$eq: ['$facility_id', '$$facility_id']}}
              ]
            }}
        ], as: "spot"
      }
    },
    {$unwind:{path:'$spot', preserveNullAndEmptyArrays:true}},
    {$lookup: {
        from: 'subscriptions', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$and : [
                {$expr: {$eq: ['$status', 'active']}},
                {$expr: {$eq: ['$facility_id', '$$facility_id']}}
              ]
            }}
        ], as: "subscription"
      }
    },
    {$unwind: {path: '$subscription', preserveNullAndEmptyArrays: true}}
  ];

  if(opts.filters.category) {
    opts.join.push({$match: {category: {$in: [opts.filters.category]}}})
    opts.filters.category = {$in: [opts.filters.category]};
  }

  return this.__proto__.gets.apply(this, [opts]);
}

Facility.get = function(id, key){
    //Get the data
    this._join = [
        {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
        {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'packages', localField: 'plan_id', foreignField: '_id', as: 'plan'}},
        {$unwind: {path: '$plan', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'adspots', localField: 'spot_id', foreignField: '_id', as: 'spot'}},
        {$unwind: {path: '$spot', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'users', localField: 'user_id', foreignField: '_id', as: 'user'}},
        {$unwind: {path: '$user', preserveNullAndEmptyArrays: true}},
        {
            $lookup: {
                from: 'reviews', let: {facility_id: '$_id'},
                pipeline: [
                    {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
                    {$match: {$expr: {$eq: ['$status', 'approved']}}},
                    {
                        $group: {
                            _id: null,
                            avg: { $avg: "$rating.avg" },
                            overallAvg: { $avg: "$rating.overall" },
                            treatmentAvg: { $avg: "$rating.treatment" },
                            accommodationAvg: { $avg: "$rating.accommodation" },
                            staffAvg: { $avg: "$rating.staff" },
                            valueAvg: { $avg: "$rating.value" },
                            foodAvg: { $avg: "$rating.food" },
                            total: { $sum: 1 }
                        }
                    }
                ], as: "review"
            }
        },
        {$unwind: {path: '$review', preserveNullAndEmptyArrays: true}}
    ];

    return this.__proto__.get.apply(this, [id, key]);
}

Facility.gets = function(opts){
    //Get the data

    opts = opts || {};
    if (!opts.filters) opts.filters = {};
    if (opts && opts.filters.state) opts.filters.company_id = mongojs.ObjectId(opts.filters.company_id);
    if (opts && opts.filters.status) opts.filters.status = opts.filters.status;

    opts.join = [
        {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
        {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'packages', localField: 'plan_id', foreignField: '_id', as: 'plan'}},
        {$unwind: {path: '$plan', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'adspots', localField: 'spot_id', foreignField: '_id', as: 'spot'}},
        {$unwind: {path: '$spot', preserveNullAndEmptyArrays: true}},
        {$lookup: {from: 'users', localField: 'user_id', foreignField: '_id', as: 'user'}},
        {$unwind: {path: '$user', preserveNullAndEmptyArrays: true}},
        {
            $lookup: {
                from: 'reviews', let: {facility_id: '$_id'},
                pipeline: [
                    {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
                    {$match: {$expr: {$eq: ['$status', 'approved']}}},
                    {
                        $group: {
                            _id: null,
                            avg: { $avg: "$rating.avg" },
                            overallAvg: { $avg: "$rating.overall" },
                            treatmentAvg: { $avg: "$rating.treatment" },
                            accommodationAvg: { $avg: "$rating.accommodation" },
                            staffAvg: { $avg: "$rating.staff" },
                            valueAvg: { $avg: "$rating.value" },
                            foodAvg: { $avg: "$rating.food" },
                            total: { $sum: 1 }
                        }
                    }
                ], as: "review"
            }
        },
        {$unwind: {path: '$review', preserveNullAndEmptyArrays: true}}
    ];

    if(opts.filters.category) {
        opts.join.push({$match: {category: {$in: [opts.filters.category]}}})
        opts.filters.category = {$in: [opts.filters.category]};
    }

    if (opts.sSearch) {
        /*opts.join.push({$match: {$or: [{id: {$regex: new RegExp(opts.sSearch, 'i')}}, {id: Number(opts.sSearch)}, {name: {$regex: new RegExp(opts.sSearch, 'i')}}, {accountnumber: {$regex: new RegExp(opts.sSearch, 'i')}}]}})*/
    }

    return this.__proto__.gets.apply(this, [opts]);
}

Facility.slugify = function(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

Facility.updateSubscription = function(item) {
  var request = Transaction.getSubscriptionStatusRequest(item.subscription_id);
  Transaction.sendRequest(request, async function (err, result) {
    if (err) {
      return
    }

    Facility.db.update({_id: item._id}, {$set: {subscription_status: result.getStatus()}})

  })
};

Facility.check = function(name) {
  return new Promise(function(resolve, reject){
    Facility.db.findOne({name: new RegExp(["^", name, "$"].join(""), "i")}, function (err, result) {
      if(err) reject(err)

      resolve(result)
    })
  })
};

Facility.createBatch = function(bulkop) {
  return new Promise(function(resolve, reject){
    bulkop.execute(function(err, result){
      if(err) return reject(err)

      resolve(result)
    });
  })
};

module.exports = Facility;
