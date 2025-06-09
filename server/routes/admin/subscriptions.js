var express = require('express'),
  router = express.Router(),
  mongojs = require("mongojs"),
  util = require('../../utils');
var Subscription = require("../../libs/subscription");

router.get('/', function(req, res) {
  var opts = req.query || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);

  opts.join = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'packages', localField: 'package_id', foreignField: '_id', as: 'package'}},
    {$unwind: {path: '$package', preserveNullAndEmptyArrays: true}}
  ];

  if (opts && opts.sSearch) opts.join.push({$match: {'facility.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}}});

  opts.count = Object.assign([], opts.join);
  opts.count.push({$count: 'count'});

  var skip = (opts.page * opts.max)
  opts.join.push({$skip: Number(skip)});
  opts.join.push({$limit: Number(opts.max || 25)});

  Subscription.db.aggregate(opts.join, function(err, results){
    if(err) return res.send({error: err.message, data: false});

    Subscription.db.aggregate(opts.count, function(err, result){
      if(err) return res.send({error: err.message, data: false});

      var total = 0;
      if(result && result.length) total = result[0].count;

      res.send({ data: results, total: total })
    });
  });

});

router.post('/', function(req, res) {
  if(req.body.args.facility_id) req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
  if(req.body.args.package_id) req.body.args.package_id = mongojs.ObjectId(req.body.args.package_id);
  if(req.body.args.subscription_end) req.body.args.subscription_end = new Date(req.body.args.subscription_end).getTime();
  if(req.body.args.subscription_start) req.body.args.subscription_start = new Date(req.body.args.subscription_start).getTime();
  Subscription.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
  if(req.body.args.facility_id) req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
  if(req.body.args.package_id) req.body.args.package_id = mongojs.ObjectId(req.body.args.package_id);
  if(req.body.args.subscription_end) req.body.args.subscription_end = new Date(req.body.args.subscription_end).getTime();
  if(req.body.args.subscription_start) req.body.args.subscription_start = new Date(req.body.args.subscription_start).getTime();
  Subscription.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  Subscription.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
