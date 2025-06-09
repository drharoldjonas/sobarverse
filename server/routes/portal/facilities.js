var express = require('express'),
  router = express.Router(),
  s3 = require("../../libs/s3"),
  mongojs = require("mongojs"),
  utils = require("utils-pkg");

var Facility = require("../../libs/facility");
var util = require("../../utils");



router.get('/', function(req, res) {
  var opts = req.query || {};
  var filters = req.query.filters || {};

  opts.filters = filters;
  if (req.query.max) opts.max = Number(req.query.max);
  if (req.query.page) opts.page = Number(req.query.page);

  if (req.query.sSearch) {
    opts.filters.name = {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')};
  }
  opts.filters.company_id = req.data.credentials.company_id;

  Facility.gets(opts).then(function(result){ res.send({ data: result }) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.get('/:id', function(req, res) {
  Facility.get(req.params.id).then(function(result){ res.send({ data: result }) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', s3.upload.fields(s3.fields), async function(req, res) {
  req.body.args = JSON.parse(req.body.args);
  if(req.body.args.company_id) req.body.args.company_id = mongojs.ObjectId(req.body.args.company_id);
  req.body.args.status = 'pending';

  if(req.body.args.location && req.body.args.location.coordinates.length) {
    req.body.args.location.coordinates = [Number(req.body.args.location.coordinates[0]), Number(req.body.args.location.coordinates[1])];
    req.body.args.location.type = "Point";
  } else {
    delete req.body.args.location
  }

  let slug = req.body.args.name;
  if(req.body.args.city) slug = slug + '-' + req.body.args.city;
  if(req.body.args.state) slug = slug + '-' + req.body.args.state;
  req.body.args.slug = Facility.slugify(slug);

  if(req.files) {
    try {
      if(req.files.logo && req.files.logo.length) {
        var logo = await s3.saveSingle(req.files.logo[0]);
        req.body.args.profile.logo = logo;
      }
      if(req.files.image && req.files.image.length) {
        var images = await s3.saveMuliti(req.files.image);
        req.body.args.profile.images = images;
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }
  Facility.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/cancel/:id', function(req, res) {
  Facility.edit(req.params.id, {subscription_status: 'canceled'}).then(function(result){
    res.send({error: null, data: result})
  }).catch(function(err){
    res.send({error: err.message, data: false});
  });
});

router.post('/profile', s3.upload.fields(s3.fields), async function(req, res) {
  req.body.args = JSON.parse(req.body.args);

  if(req.files) {
    try {
      if(req.files.logo && req.files.logo.length) {
        var logo = await s3.saveSingle(req.files.logo[0]);
        req.body.args.logo = logo;
      }
      if(req.files.image && req.files.image.length) {
        var images = await s3.saveMuliti(req.files.image);
        req.body.args.images = images;
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }

  Facility.edit(req.body.id, {profile: req.body.args}).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', s3.upload.fields(s3.fields), async function(req, res) {
  req.body.args = JSON.parse(req.body.args);

  if(req.body.args.company_id) req.body.args.company_id = mongojs.ObjectId(req.body.args.company_id);

  if(req.body.args.location && req.body.args.location.coordinates.length) {
    req.body.args.location.coordinates = [Number(req.body.args.location.coordinates[0]), Number(req.body.args.location.coordinates[1])];
    req.body.args.location.type = "Point";
  } else {
    delete req.body.args.location
  }

  let slug = req.body.args.name;
  if(req.body.args.city) slug = slug + '-' + req.body.args.city;
  if(req.body.args.state) slug = slug + '-' + req.body.args.state;
  req.body.args.slug = Facility.slugify(slug);

  if(req.files) {
    try {
      if(req.files.logo && req.files.logo.length) {
        var logo = await s3.saveSingle(req.files.logo[0]);
        req.body.args.profile.logo = logo;
      }
      if(req.files.image && req.files.image.length) {
        var images = await s3.saveMuliti(req.files.image);
        if(req.body.args.profile.images) {
          req.body.args.profile.images = req.body.args.profile.images.concat(images);
        } else {
          req.body.args.profile.images = images;
        }
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }

  Facility.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
  Facility.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
