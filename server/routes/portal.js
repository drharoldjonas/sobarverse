var express = require('express'),
  multer = require('multer'),
  crypto = require('crypto'),
  mongojs = require('mongojs'),
  util = require('../utils'),
  router = express.Router();

const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const payPalClient = require('../libs/paypal');

var User = require("../libs/user");
var Facility = require("../libs/facility");
var Transaction = require("../libs/transaction");
var Package = require("../libs/package");
var Adspot = require("../libs/adspot");
var SpotRequest = require("../libs/adspot_request");

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

router.use('*', function(req, res, next){
  if(!req.data.credentials) {
    return res.status(401).send({error: 'Unauthenticated'})
  }
  next();
});

router.get("/stats", function(req, res){
  var stages = [
    {$lookup: {from: 'facilities', localField: 'facility_id', foreignField: '_id', as: 'facility'}},
    {$unwind: {path: '$facility', preserveNullAndEmptyArrays: true}},
    {$match: {company_id: req.data.credentials.company_id}},
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
        phone_clicks: "$phone_clicks.count", phone_views: "$phone_views.count"}}
  ];

  if (req.query.sSearch) stages.push({$match: {'name': {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}}});

  req.query.page = Number(req.query.page);
  req.query.max = Number(req.query.max);
  var skip = (req.query.page * req.query.max)
  if(req.query.page){
    stages.push({$skip: Number(skip)});
  }
  if(req.query.max) {
    stages.push({$limit: Number(req.query.max || 25)});
  }

  Facility.db.aggregate(stages, function(err, result) {
    if(err) return res.send({error: err.message, data: null});

    Facility.db.count({company_id: req.data.credentials.company_id}, function(err, total){
      if(err) return res.send({error: err.message, data: null});

      return res.send({error: null, data: result, total: total});
    });
  })
});

router.post("/checkout", async function(req, res){
  if(!req.body.id) return res.send({error: "Missing arguments", data: false});

  var spot_id = '';

  try {
    var facility = await Facility.get(req.body.id);
    var plan = await Package.get(req.body.plan_id);
    if(req.body.spot) {
      var spot = await Adspot.available(req.body.spot)
      spot_id = spot._id;
    }
  } catch (e) {
    return res.send({error: e.message, data: false});
  }

  var cart = {};
  cart.id = plan._id;
  cart.description = plan.description;
  cart.name = plan.name;
  cart.total = Number(plan.price);
  cart.tax = 0;

  if(plan.featured && spot && spot.price) {
    cart.total = cart.total + Number(spot.price)
  }

  var order = {company_id: req.data.credentials.company_id, user_id: req.data.credentials._id, facility_id: mongojs.ObjectId(req.body.id)};

  if(req.body.card) {
    var card = req.body.card;
    card.facility_id = mongojs.ObjectId(req.body.id);
    card.company_email = (req.data.credentials.company) ? req.data.credentials.company.email : card.email;

    order.email = card.email;
    order.firstname = card.firstname;
    order.lastname = card.lastname;
    order.phone = card.phone;
    order.address = card.address;
    order.city = card.city;
    order.state = card.state;
    order.zip = card.zip;
    order.country = card.country;
  } else {
    order.email = facility.payment.email;
    order.firstname = facility.payment.firstname;
    order.lastname = facility.payment.lastname;
    order.phone = facility.payment.phone;
    order.address = facility.payment.address;
    order.city = facility.payment.city;
    order.state = facility.payment.state;
    order.zip = facility.payment.zip;
    order.country = facility.payment.country;
  }

  order.order_type = 'card';

  order.total = cart.total;
  order.tax = cart.tax;

  var exp = new Date();
  exp.setMonth(exp.getMonth() + 1);

  var items = await Transaction.getLineItems([cart]);
  order.items = items.lineItem;
  cart.lineItems = items;

  if(req.body.card) {
    var request = Transaction.createRequest(cart, card);
  } else {
    var request = Transaction.createCustomerChargeRequest(cart, facility.payment);
  }

  Transaction.sendRequest(request, async function (err, result) {
    if (err) {
      return res.send({error: err.message})
    }
    order.transaction_id = result.transactionId;
    order.order_type = "credit_card";

    var payment = facility.payment;
    if(req.body.card) {
      payment = {email: card.email, firstname: card.firstname,
        lastname: card.lastname, phone: card.phone, address: card.address, city: card.city, state: card.state,
        zip: card.zip, country: card.country, accountNumber: result.accountNumber, accountType: result.accountType,
        profile_id: result.profile_id, payment_id: result.payment_id}
    }

    try {
      await Transaction.add(order);
      await Facility.edit(req.body.id, {subscription_status: 'active', expires: exp, activated: new Date(), plan_id: mongojs.ObjectId(req.body.plan_id),
        spot_id: spot_id, featured: plan.featured, payment: payment});
    } catch(e) {
      return res.send({error: e.message, data: false});
    }

    return res.send({error: null, result: "success"})
  });
});

router.put('/payment', function(req, res) {
  if(!req.body.card) res.send({error: 'No Arguments provided'});

  var card = req.body.card;
  var request = Transaction.updateCustomerPaymentProfileRequest(card);
  Transaction.sendRequest(request, function (err, result) {
    if (err) {
      return res.send({error: err.message})
    }

    Facility.edit(req.body.id, {$set: {payment: {email: card.email, firstname: card.firstname,
        lastname: card.lastname, phone: card.phone, address: card.address, city: card.city, state: card.state,
        zip: card.zip, country: card.country, accountNumber: result.accountNumber, accountType: result.accountType,
        profile_id: result.profile_id, payment_id: result.payment_id}}}, function(err, result){
      if(err) return res.send({error: err.message})

      res.send({error: null, data: result})
    });
  })
})

router.delete('/payment/:id/:profile_id', function(req, res) {
  var request = Transaction.deleteCustomerProfile(req.params.profile_id);
  Transaction.sendRequest(request, function (err, result) {
    if (err) {
      return res.send({error: err.message})
    }

    Facility.edit(req.params.id, {$set: {payment: null}}, function(err, result){
      if(err) return res.send({error: err.message});

      res.send({error: null, data: result})
    });
  })
})

router.post('/placement', async function(req, res) {
  if(!req.body) res.send({error: 'No Arguments provided'});

  req.body.facility_id = mongojs.ObjectId(req.body.facility_id);
  req.body.company_id = req.data.credentials.company_id;
  req.body.spot_id = mongojs.ObjectId(req.body.spot_id);
  req.body.status = 'pending';

  SpotRequest.add(req.body).then(function(result){
    res.send({error: null, data: result})
  }).catch(function(err){
    res.send({error: err.message});
  });
});

router.get('/placement/:id', async function(req, res) {
  var stages = [
    {$match: {facility_id: mongojs.ObjectId(req.params.id)}},
    {$lookup: {from: 'adspots', localField: 'spot_id', foreignField: '_id', as: 'spot'}},
    {$unwind: {path: '$spot', preserveNullAndEmptyArrays: true}},
  ];

  SpotRequest.db.aggregate(stages, function(err, result){
    if(err) return res.send({error: err.message});

    res.send({error: null, data: result})
  });
});

router.use('/inquiries', require("./portal/inquiries"));

router.use('/facilities', require("./portal/facilities"));

router.use('/companies', require("./portal/companies"));

router.use('/reviews', require("./portal/reviews"));

router.use('/users', require("./portal/users"));

router.use('/transactions', require("./portal/transactions"));

module.exports = router;
