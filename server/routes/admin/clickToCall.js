var express = require('express'),
  router = express.Router();

var Click = require("../../libs/clickToCall");
var util = require("../../utils");

router.get('/', function (req, res) {
  var opts = req.query.opts || {};
  var filters = req.query.filters || {};

  if (req.query.sSearch) {
    filters.$or = [
      {name: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
      {email: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
      {phone: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
    ];
  }

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);

  Click.gets(opts).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.get('/:id', function(req, res) {
  Click.get(req.params.id).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function (req, res) {
  Click.add(req.body.args).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.post('/', function (req, res) {
  Click.edit(req.body.id, req.body.args).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.delete('/:id', function (req, res) {
  Click.delete(req.params.id).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

module.exports = router;
