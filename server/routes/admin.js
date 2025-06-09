var express = require('express'),
  router = express.Router();

var User = require("../libs/user");
var Facility = require("../libs/facility");
var util = require("../utils");

var cookiename = "apikey";

// credentials handler
router.use('*', function(req, res, next){

  req.data = (req.data) ? req.data : {credentials:null};

  if (!(req.headers && req.headers.authorization) && !(req.cookies && req.cookies[cookiename])) {
    return; res.status(401).send({error: "Unauthorized access"});
  } else {
    // decode the token
    if (!(req.headers && req.headers.authorization)) {
      var token = req.cookies[cookiename];
    } else {
      var header = req.headers.authorization.split(' ');
      var token = header[1];
    }

    if (!token) {
      return; res.status(401).send({error: "Unauthorized access"});
    }

    User.validate(token, function (err, member) {
      //Pass the data to the page and render
      if (err) {
        return; res.status(401).send({error: "Unauthorized access"});
      }

      if (member && member[0]) {
        req.data.credentials = member[0];
        next()
        return
      }
      return; res.status(401).send({error: "Unauthorized access"});
    });
  }
});

router.get('/profile', function(req, res){
  res.send({user: req.data.admin});
});

router.get('/settings', function(req, res){
  //Handle the request
  var Settings = require("../libs/settings");
  Settings.load(function(err, data){
    if(err)
      res.send({error: err.message, data: null});
    else
      res.send({error: null, data: data});
  });
});

var s3 = require("../libs/s3");
const Menu = require("../libs/menu");
const Settings = require("../libs/settings");
router.post('/settings/graph', s3.upload.fields(s3.graphFields), async function(req, res){
  //Handle the request
  var Settings = require("../libs/settings");

  try {
    var advertise = {};
    if(req.files.graph1 && req.files.graph1.length) {
      var graph1 = await s3.saveSingle(req.files.graph1[0]);
      advertise.graph1 = graph1;
    }
    if(req.files.graph2 && req.files.graph2.length) {
      var graph2 = await s3.saveSingle(req.files.graph2[0]);
      advertise.graph2 = graph2;
    }

    Settings.settings.advertise = Object.assign(global.settings.advertise, advertise);
    global.settings.advertise = Object.assign(global.settings.advertise, advertise);
    Settings.save(function(err, data) {
      if(err)
        return res.send({error: err.message, data: false});

      res.send({error: null, data: data});
    });

  } catch (e) {
    return res.send({error: e.message, data: false});
  }
});

router.get("/settings/menu", function (req, res) {
  //Handle the request
  var Menu = require("../libs/menu");

  Menu.db.findOne({},(err, data) => {
    if(err) res.send({error: err.message, data: null});

    res.send({error: null, data: data});
  })
})

router.post('/settings/menu', async (req, res) => {
  //Handle the request
  let Menu = require("../libs/menu");
  const mongojs = require('mongojs')

  try {

    Menu.passive_menu = req.body.passive_menu
    Menu.active_menu = req.body.active_menu


    global.menus.passive_menu = req.body.passive_menu
    global.menus.active_menu = req.body.active_menu

    Menu.db.update({_id: mongojs.ObjectId(req.body.id)}, req.body, ( err, data ) => {
      if (err)
        return res.send({error: err.message, data: false});

      res.send({error: null, data: data});
    })
  } catch (e) {
    return res.send({error: e.message, data: false});
  }
});

router.post('/settings/blog-settings', (req, res) => {
  let Blog = require('../libs/blog');
  const mongojs = require('mongojs')

  let id = req.body._id
  delete req.body._id

  try {
    Blog.db.update({_id: mongojs.ObjectId(id)}, req.body, ( error, data ) => {
      if (error) return res.send({error: error.message, data: false});
      res.send({error: null, data: data});
    })

  } catch (e) {
    return res.send({error: e.message, data: false});
  }
})

router.get('/settings/blog-settings', (req, res) => {
  let Blog = require('../libs/blog');

  Blog.db.findOne({}, {},(error, data) => {
    if (error) return res.send({error: error.message, data: false});
    res.send({error: null, data})
  })
})

router.post('/settings/banners', async (req, res) => {
  //Handle the request
  let Settings = require("../libs/settings");

  try {
    let banners = {}

    Settings.settings.banners = Object.assign(req.body.args.banners, banners);
    global.settings.banners = Object.assign(req.body.args.banners, banners);

    Settings.save(( err, data ) => {
      if(err)
        return res.send({error: err.message, data: false});

      res.send({error: null, data: data});
    });

  } catch (e) {
    return res.send({error: e.message, data: false});
  }
});

router.post('/settings', function(req, res){
  //Handle the request
  var Settings = require("../libs/settings");
  Settings.settings = Object.assign(global.settings, req.body.args);
  global.settings = Object.assign(global.settings, req.body.args);
  Settings.save(function(err, data) {
    if(err)
      return res.send({error: err.message, data: false});

    res.send({error: null, data: data});
  });
});

router.get("/stats", function(req, res){
  var stages = [
    {$lookup: {from: 'companies', localField: 'company_id', foreignField: '_id', as: 'company'}},
    {$unwind: {path: '$company', preserveNullAndEmptyArrays: true}},
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$lookup: {
        from: 'stats', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
          {$match: {$expr: {$eq: ['$type', 'page_views']}}},
          {$count: 'count'}
        ], as: "page_views"
      }
    },
    {$unwind:{path:'$page_views', preserveNullAndEmptyArrays:true}},
    {$lookup: {
        from: 'stats', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
          {$match: {$expr: {$eq: ['$type', 'phone_views']}}},
          {$count: 'count'}
        ], as: "phone_views"
      }
    },
    {$unwind:{path:'$phone_views', preserveNullAndEmptyArrays:true}},
    {$lookup: {
        from: 'stats', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
          {$match: {$expr: {$eq: ['$type', 'phone_clicks']}}},
          {$count: 'count'}
        ], as: "phone_clicks"
      }
    },
    {$unwind:{path:'$phone_clicks', preserveNullAndEmptyArrays:true}},
    {$lookup: {
        from: 'stats', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
          {$match: {$expr: {$eq: ['$type', 'website_views']}}},
          {$count: 'count'}
        ], as: "website_views"
      }
    },
    {$unwind:{path:'$website_views', preserveNullAndEmptyArrays:true}},
    {$lookup: {
        from: 'stats', let: {facility_id: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$facility_id', '$$facility_id']}}},
          {$match: {$expr: {$eq: ['$type', 'form_fills']}}},
          {$count: 'count'}
        ], as: "form_fills"
      }
    },
    {$unwind:{path:'$form_fills', preserveNullAndEmptyArrays:true}},
    {$project:{name: "$name", page_views: "$page_views.count", form_fills: "$form_fills.count", website_views: "$website_views.count",
        phone_clicks: "$phone_clicks.count", phone_views: "$phone_views.count", company: '$company'}}
  ];

  if (req.query.sSearch) stages.push({$match: {$or: [{'name': {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}}, {'company.name': {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}}]}});

  if(req.query.page) req.query.page = Number(req.query.page);
  if(req.query.max) req.query.max = Number(req.query.max);
  var skip = (req.query.page * req.query.max)
  if(req.query.page){
    stages.push({$skip: Number(skip)});
  }
  if(req.query.max) {
    stages.push({$limit: Number(req.query.max || 25)});
  }

  Facility.db.aggregate(stages, function(err, result) {
    if(err) return res.send({error: err.message, data: null});

    Facility.db.count({}, function(err, total){
      if(err) return res.send({error: err.message, data: null});

      return res.send({error: null, data: result, total: total});
    });
  })
});

router.use('/inquiry', require("./admin/inquiry"));

router.use('/contact', require("./admin/contact"));

router.use('/form-fill', require("./admin/formfill"));

router.use('/subscriptions', require("./admin/subscriptions"));

router.use('/meeting', require("./admin/meetings"));

router.use('/companies', require("./admin/companies"));

router.use('/expertvideos', require("./admin/expertvideos"));

router.use('/pressroom', require("./admin/pressroom"));

router.use('/category', require("./admin/facilityCategory"));

router.use('/banner-ads', require("./admin/bannerAds"));

router.use('/categories', require("./admin/categories"));

router.use('/transactions', require("./admin/transactions"));

router.use('/packages', require("./admin/packages"));

router.use('/facilities', require("./admin/facilities"));

router.use('/reviews', require("./admin/reviews"));

router.use('/roles', require("./admin/roles"));

router.use('/users', require("./admin/users"));

router.use('/adspots', require("./admin/adspots"));

router.use('/adspotrequests', require("./admin/adspotrequests"));

router.use('/click2call', require("./admin/clickToCall"));

router.use('/connect', require("./admin/connect"));

router.use('/facility-category', require('./admin/facilityCategory'));

// router.use('/stats', require("./admin/stats"));


router.get('/regions', function(req, res, next) {
  var regions = {
    Midwest: "il,in,ia,ks,mi,mn,mo,ne,nd,oh,sd,wi".split(","),
    South: "al,ar,fl,ga,ky,la,ms,nc,ok,sc,tn,tx,va,wv".split(","),
    West: "ak,az,ca,co,hi,id,mt,nv,nm,or,ut,wa,wy".split(","),
    Northeast: "ct,de,me,ma,nh,nj,ny,pa,ri,vt".split(",")
  }
  res.json(regions);
});

module.exports = router;
