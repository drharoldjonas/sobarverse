var express = require('express'),
  router = express.Router();

var Contact = require("../../libs/contact");
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



  Contact.gets(opts).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.get('/:id', function(req, res) {
  Contact.get(req.params.id).then(function(result){ res.send({data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function (req, res) {
  Contact.add(req.body.args).then(function (result) {
    res.send(result)
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.post('/', function (req, res) {
  Contact.edit(req.body.id, req.body.args).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.delete('/:id', function (req, res) {
  Contact.delete(req.params.id).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

module.exports = router;
