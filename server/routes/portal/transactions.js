var express = require('express'),
  router = express.Router(),
  mongojs = require("mongojs");

var Transaction = require("../../libs/transaction");

router.get('/', function(req, res) {
  var opts = req.query || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);
  opts.filters.company_id = req.data.credentials.company_id;

  Transaction.gets(opts).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {
  Transaction.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
  Transaction.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  Transaction.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
