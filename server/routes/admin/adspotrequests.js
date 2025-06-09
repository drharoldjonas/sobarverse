var express = require('express'),
  router = express.Router(),
  mongojs = require("mongojs");
var AdspotRequest = require("../../libs/adspot_request");

router.get('/', function(req, res) {
  var opts = req.query || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);

  AdspotRequest.gets(opts).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {
  AdspotRequest.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
  AdspotRequest.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/approve/:id', function(req, res) {
  AdspotRequest.edit(req.params.id, {status: 'approved'}).then(function(result){
    global.events.emit('sendFeaturedApproval', result._id);
    res.send({error:null, data: result})
  }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/deny/:id', function(req, res) {
  AdspotRequest.edit(req.params.id, {status: 'denied'}).then(function(result){
    global.events.emit('sendFeaturedDenial', result._id);
    res.send({error:null, data: result})
  }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  AdspotRequest.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
