var express = require('express'),
  router = express.Router(),
  mongojs = require("mongojs");
var Adspot = require("../../libs/adspot");

router.get('/', function(req, res) {
  Adspot.gets(req.query).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.get('/available', function(req, res) {
  Adspot.availableList().then(function(result){ res.send({data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {
  if(req.body.args.facility_id) req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
  if(req.body.args.expires) req.body.args.expires = new Date(req.body.args.expires).getTime();
  Adspot.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
  if(req.body.args.facility_id) req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
  if(req.body.args.expires) req.body.args.expires = new Date(req.body.args.expires).getTime();
  Adspot.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  Adspot.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
