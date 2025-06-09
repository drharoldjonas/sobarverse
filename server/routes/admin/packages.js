var express = require('express'),
  router = express.Router(),
  mongojs = require("mongojs");

var Package = require("../../libs/package");

router.get('/', function(req, res) {
  var opts = req.query || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);

  Package.gets(opts).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {
  Package.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
  Package.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  Package.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
