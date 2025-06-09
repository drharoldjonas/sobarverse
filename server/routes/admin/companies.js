var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs");
var Company = require("../../libs/company");
var util = require("../../utils");

router.get('/', function(req, res) {
    let filters = {};

    if (req.query.sSearch) {
      filters.name = {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')};
    }

    let stages = [
        {
          $match: filters
        },
        {
          $sort: {created_ts: -1}
        },
        {
          $lookup: {
            from: 'facilities', let: { company_id: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$company_id', '$$company_id'] } } },
              { $count: 'count' }
            ],
            as: "facilities"
          }
        },
        {
          $unwind: {
            path: '$facilities',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          '$skip': Number(req.query.page) * Number(req.query.max)
        },
        {
          '$limit': Number(req.query.max)
        },
      ]

    Company.db.count(filters, (error, count) => {
      if (error) console.error('facility.category.count ', error)

      Company.db.aggregate(stages, (error, results) => {
        if (error) return res.send({error: error.message, data: false});
        res.send({error: null, total: count, data: results});
      })
    })
});

router.post('/', function(req, res) {
    Company.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
    Company.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
    Company.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
