var express = require('express'),
  router = express.Router();

var Inquiry = require("../../libs/contact");

router.get('/', function (req, res) {
  var opts = req.query.opts || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);
  opts.filters.company_id = req.data.credentials.company_id;

  Inquiry.gets(opts).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.get('/:id', function(req, res) {
  Inquiry.get(req.params.id).then(function(result){ res.send({data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function (req, res) {
  Inquiry.add(req.body.args).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.put('/', function (req, res) {
  Inquiry.edit(req.body.id, req.body.args).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.delete('/:id', function (req, res) {
  Inquiry.delete(req.params.id).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

module.exports = router;
