var express = require("express"),
  router = express.Router(),
  mongojs = require("mongojs"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  util = require("../utils"),
  utils = require("utils-pkg");

var cookiename = "apikey";

var Facility = require("../libs/facility");
var Company = require("../libs/company");
var Package = require("../libs/package");
var Click2Call = require("../libs/clickToCall");
var Adspot = require("../libs/adspot");
var Transaction = require("../libs/transaction");
var Subscription = require("../libs/subscription");
let Blog = require('../libs/blog');
var User = require("../libs/user");
var s3 = require("../libs/s3");
var reCaptcha = require("../libs/reCaptcha");
var Banner = require("../libs/banner_ads");

const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const payPalClient = require("../libs/paypal");
const facilityCategory = require("../libs/facility_categories");

router.use('/sober_blog', require("./blog"));

router.get('/blog-settings', (req, res) => {
  Blog.db.findOne({}, {blog_widgets: 1, category_widgets: 1, layout: 1, widget_settings: 1, search_widgets: 1}, function (err, result) {
    if (result) delete result._id
    return res.send({ error: null, data: result });
  });
});

router.get('/banners', (req, res) => {
  Banner.db.find({status: 'active'}, {creative: 1, label: 1, url: 1}, function (err, result) {
    res.send(result)
  });
});

router.post('/vendor-cat-search', async (req, res) => {
  let filters = {};

  if (req.body.search) {
    filters.name = {$regex: new RegExp(util.escapeRegex(req.body.search), 'gi')};
  }

  let stages = [
    {
      $match: filters
    }
  ]

  facilityCategory.db.aggregate(stages, function (error, results) {
    if (error) return res.send({error: error.message, data: false});
    res.send({error: null, data: results});
  })
})

router.post('/vendor-cat-populated', async (req, res) => {
  facilityCategory.db.find({status: 'active'}, function (error, results) {
    if (error) return res.send({error: error.message, data: false});
    res.send({error: null, data: results});
  })
})

router.get('/category/:id', (req, res) => {
  if (!req.params.id || req.params.id === 'undefined') return res.send({message: 'No category slug sent.', data: false})

  let slug = {$regex: new RegExp(util.escapeRegex(req.params.id), 'i')}

  facilityCategory.db.findOne({slug: slug}, (error, result) => {
    if (error) console.error('facility.category ',error)
    if (!result) return res.send({message: 'Category not found.', data: false})

    let description = result.description || ''

    let stages = [
      {
        $match: { status: 'approved', 'vendor_category': { $in: [result._id.toString()] } }
      },
      {
        '$sort': { created_ts: -1 }
      },
      {
        '$skip': Number(req.query.page) * Number(req.query.max)
      },
      {
        '$limit': Number(req.query.max)
      }
    ]

    Facility.db.count({status: 'approved', 'vendor_category': { $in: [result._id.toString()] }}, (error, count) => {
      if (error) console.error('facility.count ', error)

      Facility.db.aggregate(stages, (error, results) => {
        console.log(error)
        res.send({error: null, total: count, data: results, description: description});
      })
    })
  })

})

router.get('/category', (req, res) => {
  let stages = [
    {
      $match: { status: 'active' }
    },
    {
      '$skip': Number(req.query.page) * Number(req.query.max)
    },
    {
      '$limit': Number(req.query.max)
    }
  ]

  facilityCategory.db.count({status: 'active'}, (err, count) => {
    if (err) console.error('facility.category.count ', err)

    facilityCategory.db.aggregate(stages, (error, results) => {
      if (error) console.error('facility.category ', error)
      res.send({error: null, total: count, data: results});
    })
  })
})

router.use("*", function (req, res, next) {
  if (req.query.filters) {
    req.query.filters = JSON.parse(req.query.filters);
  }

  if (req.query.orderby) {
    req.query.orderby = JSON.parse(req.query.orderby);
  }

  req.data = req.data ? req.data : { apikey: "", credentials: null };

  if (
    !(req.headers && req.headers.authorization) &&
    !(req.cookies && req.cookies[cookiename])
  ) {
    if (next) next();
  } else {
    // decode the token
    if (!(req.headers && req.headers.authorization)) {
      var token = req.cookies[cookiename];
    } else {
      var header = req.headers.authorization.split(" ");
      var token = header[1];
    }

    if (!token) {
      if (next) next();
      return;
    }

    User.validate(token, function (err, member) {
      //Pass the data to the page and render
      if (err) {
        if (next) next();
        return;
      }
      req.data = req.data ? req.data : { apikey: "", credentials: null };
      req.data.apikey = token;
      res.cookie(cookiename, token);
      if (member && member[0]) {
        req.data.credentials = member[0];
      }
      if (next) next();
    });
  }
});

router.get("/settings", function (req, res) {
  //Handle the request
  var Settings = require("../libs/settings");
  Settings.settings.adsense = null;
  res.send({
    error: null,
    data: {
      social: Settings.settings.social,
      general: Settings.settings.general,
      adsense: Settings.settings.adsense,
    },
  });
});

router.get("/terms", function (req, res) {
  //Handle the request
  var Settings = require("../libs/settings");
  res.send({ error: null, data: Settings.settings.terms });
});

router.get("/privacy", function (req, res) {
  //Handle the request
  var Settings = require("../libs/settings");
  res.send({ error: null, data: Settings.settings.privacy });
});

router.get("/advertising", function (req, res) {
  //Handle the request
  var Settings = require("../libs/settings");
  res.send({ error: null, data: Settings.settings.advertise });
});

router.post("/reset/password", async function (req, res, next) {
  try {
    var user = await User.get(req.body.email, "email");
  } catch (e) {
    res.send({ error: e.message, data: false });
  }

  if (!user)
    return res.send({
      error: "Could not find user associated with entered email",
    });

  var password = Math.random().toString(36).substring(7);
  var hashedPassword = bcrypt.hashSync(password, 8);

  User.edit(user._id, {
    password: hashedPassword,
    password_updated: new Date().getTime(),
  })
    .then(function (result) {
      global.events.emit("sendPasswordReset", user._id, password);
      res.send({ error: null, data: result });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/register", async function (req, res, next) {
  if (req.body.user.email) req.body.user.email.trim().toLowerCase();

  try {
    var company = await Company.check(req.body.company.name);
    var user = await User.check(req.body.user.email);
  } catch (e) {
    return res.send({ error: e.message });
  }

  if (user) {
    return res.send({ error: "User email already exist", error_code: 2 });
  }

  if (company) {
    return res.send({ error: "Company name already exist", error_code: 1 });
  }

  if (req.body.user.role_id) mongojs.ObjectId(req.body.user.role_id);

  try {
    var company = await Company.add(req.body.company);
    req.body.user.company_id = company._id;
    var hashedPassword = bcrypt.hashSync(req.body.user.password, 8);
    req.body.user.password = hashedPassword;
    var user = await User.add(req.body.user);
    res.send({ result: 200, user: user });
    global.events.emit("sendWelcome", user._id);
  } catch (e) {
    res.send({ error: e.message, data: false });
  }
});

router.post("/login", function (req, res, next) {
  if (req.body.email && req.body.password) {
    req.body.email.trim().toLowerCase();
    //Check the login credentials
    var request = { email: req.body.email };
    User.db.findOne(request, function (err, result) {
      if (err) {
        return res
          .status(401)
          .send({ message: "Server error. Please try again." });
      }

      //Process the results
      if (result) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          result.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password" });
        }

        //Handle the successful login
        var token = jwt.sign({ id: result._id }, "$G(!(#1", {
          expiresIn: 86400, // expires in 24 hours
        });
        res.cookie(cookiename, token);
        res.send({ result: 200, token: token });
      } else {
        return res.status(401).send({ message: "Invalid Email" });
      }
    });
  } else {
    return res.status(401).send({ message: "Missing Username/Password" });
  }
});

router.post("/inquiries", async function (req, res) {
  console.warn("running mail");
  var Inquiry = require("../libs/inquiry");

  try {
    reCaptcha.verify(req.body.token);
  } catch (e) {
    return res.send({ error: e.message });
  }

  delete req.body.token;

  Inquiry.add(req.body)
    .then(function (result) {
      res.status(200).send({ data: result, error: null });
      global.events.emit("sendInquiry", result._id);
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/form-fill", async function (req, res) {
  var FormFill = require("../libs/formfill");

  try {
    reCaptcha.verify(req.body.token);
  } catch (e) {
    return res.send({ error: e.message });
  }

  delete req.body.token;
  FormFill.add(req.body)
    .then(function (result) {
      res.status(200).send({ data: result, error: null });
      global.events.emit("sendFormFill", result._id);
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/connect", async function (req, res) {
  var Connect = require("../libs/connect");

  Connect.add(req.body)
    .then(function (result) {
      res.status(200).send({ data: result, error: null });
      global.events.emit("sendConnect", result._id);
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/contact", async function (req, res) {


  var Contact = require("../libs/contact");

  try {
    reCaptcha.verify(req.body.token);
  } catch (e) {
    return res.send({ error: e.message });
  }

  delete req.body.token;
  req.body.facility_id = mongojs.ObjectId(req.body.facility_id);
  req.body.company_id = mongojs.ObjectId(req.body.company_id);

  Contact.add(req.body)
    .then(function (result) {
      res.status(200).send({ data: result, error: null });
      global.events.emit("sendContact", result._id, req.body.receiver);
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/reviews/:slug", function (req, res) {
  var Review = require("../libs/review");

  if (req.query.filters) {
    req.query.filters.slug = req.params.slug;
  }

  Review.gets(req.query)
    .then(function (result) {
      res.status(200).send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/featured", function (req, res) {
  var stages = [
    { $match: { status: "active" } },
    {
      $lookup: {
        from: "facilities",
        let: { facility_id: "$facility_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$facility_id"] } } }],
        as: "facility",
      },
    },
    { $unwind: { path: "$facility", preserveNullAndEmptyArrays: true } },
  ];

  if (req.query.filters && req.query.filters.placement) {
    stages.push({ $match: { placement: req.query.filters.placement } });
  }

  stages.push({ $match: { status: { $eq: "active" } } });
  stages.push({ $match: { facility: { $exists: true } } });
  stages.push({ $match: { "facility.status": "approved" } });
  stages.push({
    $project: {
      _id: "$facility._id",
      name: "$facility.name",
      profile: "$facility.profile",
      slug: "$facility.slug",
    },
  });

  stages.push({ $sort: { placement: -1 } });

  Adspot.db.aggregate(stages, function (err, result) {
    if (err) return res.send({ error: err.message, data: false });

    res.send({ error: null, data: result });
  });
});

router.get("/meeting/:slug", function (req, res) {
  var Meeting = require("../libs/meeting");

  Meeting.get(req.params.slug, "slug")
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/meeting/get/:id", function (req, res) {
  var Meeting = require("../libs/meeting");

  Meeting.get(req.params.id)
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/facility/get/:id", function (req, res) {
  var Facility = require("../libs/facility");

  Facility.get(req.params.id)
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/sort/meetings", function (req, res) {
  var Meeting = require("../libs/meeting");

  var filters = {
    state: req.query.state,
    city: req.query.city,
    type: req.query.type,
    status: "approved",
  };

  Meeting.db.find(filters, function (err, result) {
    if (err) return res.send({ error: err.message });

    res.send({ error: null, data: result });
  });
});

router.get("/meetings/:state", function (req, res) {
  var Meeting = require("../libs/meeting");

  var stages = [
    {
      $match: {
        state: req.params.state,
        type: req.query.type,
        status: "approved",
      },
    },
  ];

  stages.push({
    $group: {
      _id: "$city",
      count: { $sum: 1 },
    },
  });

  stages.push({ $sort: { _zip: 1 } });

  Meeting.db.aggregate(stages, function (err, results) {
    if (err) return res.send({ error: err.message, data: false });
    res.send({ data: results, error: null });
  });
});

router.get("/blog", function (req, res) {
  var Request = require("request");

  var url = global.settings.general ? global.settings.general.blog : "";
  Request.get({ url: url + '/posts?per_page=3' }, async function (error, response, body) {
    if (typeof body === "string" || body instanceof String) {
      try {
        var body = JSON.parse(body);
      } catch (E) {
        return res.send({ error: err, data: null });
      }

      return res.send({ error: null, data: body });
    }
  });
});

router.get("/meetings", function (req, res) {
  var Meeting = require("../libs/meeting");

  if (!req.query.filters) req.query.filters = {};

  var stages = [
    {
      $match: { type: req.query.filters.type, status: "approved" },
    },
  ];

  if (req.query.sSearch) {
    stages.push({
      $match: {
        $or: [
          {
            name: {
              $regex: new RegExp(util.escapeRegex(req.query.sSearch), "gi"),
            },
          },
          {
            address: {
              $regex: new RegExp(util.escapeRegex(req.query.sSearch), "gi"),
            },
          },
          {
            city: {
              $regex: new RegExp(util.escapeRegex(req.query.sSearch), "gi"),
            },
          },
          {
            zip: {
              $regex: new RegExp(util.escapeRegex(req.query.sSearch), "gi"),
            },
          },
        ],
      },
    });
  }

  if (req.query.filters.state) {
    stages.push({
      $match: {
        state: {
          $regex: new RegExp(util.escapeRegex(req.query.filters.state), "gi"),
        },
      },
    });
  }

  if (req.query.filters.address) {
    stages.push({
      $match: {
        address: {
          $regex: new RegExp(util.escapeRegex(req.query.filters.address), "gi"),
        },
      },
    });
  }

  if (req.query.filters.city) {
    stages.push({
      $match: {
        city: {
          $regex: new RegExp(util.escapeRegex(req.query.filters.city), "gi"),
        },
      },
    });
  }

  if (req.query.filters.zip) {
    stages.push({
      $match: {
        zip: {
          $regex: new RegExp(util.escapeRegex(req.query.filters.zip), "gi"),
        },
      },
    });
  }

  if (req.query.filters.lat && req.query.filters.lng) {
    if (!req.query.filters.radius) req.query.filters.radius = 25;

    stages.unshift({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [
            Number(req.query.filters.lng),
            Number(req.query.filters.lat),
          ],
        },
        distanceField: "dist.calculated",
        maxDistance: Number(req.query.filters.radius) * 1609.34,
        includeLocs: "dist.location",
        spherical: true,
      },
    });
  }

  stages.push({ $sort: { city: 1 } });

  var page = req.query.page || 0;
  var max = req.query.max || 300;

  page = Number(page);
  max = Number(max);
  var skip = page * max;
  if (page) {
    stages.push({ $skip: Number(skip) });
  }
  if (max) {
    stages.push({ $limit: Number(max) });
  }

  Meeting.db.aggregate(stages, function (err, results) {
    if (err) return res.send({ error: err.message, data: false });
    res.send({ data: results, error: null });
  });
});

router.post("/meeting", function (req, res) {
  var Meeting = require("../libs/meeting");

  if (req.body.location) {
    req.body.location.coordinates = [
      Number(req.body.location.coordinates[0]),
      Number(req.body.location.coordinates[1]),
    ];
    req.body.location.type = "Point";
  }

  let slug = req.body.name;
  if (req.body.city) slug = slug + "-" + req.body.city;
  if (req.body.state) slug = slug + "-" + req.body.state;
  if (req.body.day) slug = slug + "-" + req.body.day;
  if (req.body.type) slug = slug + "-" + req.body.type;
  req.body.slug = Meeting.slugify(slug);

  req.body.status = "pending";
  req.body.is = "NEW";
  Meeting.add(req.body)
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/meeting/delete", function (req, res) {
  var Meeting = require("../libs/meeting");

  req.body.mod_status = "pending";
  req.body.is = "DELETE";
  Meeting.edit(req.body.id, {
    mod_status: "pending",
    is: "DELETE",
    delete_data: req.body,
  })
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.put("/meeting", function (req, res) {
  var Meeting = require("../libs/meeting");

  Meeting.edit(req.body.id, {
    mod_status: "pending",
    is: "MODIFIED",
    new_data: req.body.args,
  })
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/rehab", function (req, res) {
  var State = require("../libs/state");

  var stages = [
    {
      $lookup: {
        from: "facilities",
        let: { code: "$code" },
        pipeline: [
          { $match: { category: { $in: ["Drug Detox Centers"] } } },
          { $match: { $expr: { $eq: ["$state", "$$code"] } } },
          { $match: { $expr: { $eq: ["$status", "approved"] } } },
          { $count: "count" },
        ],
        as: "total",
      },
    },
    { $unwind: { path: "$total", preserveNullAndEmptyArrays: true } },
    { $sort: { name: 1 } },
    { $project: { name: "$name", total: "$total.count", code: "$code" } },
  ];

  State.db.aggregate(stages, function (err, result) {
    if (err) return res.send({ error: err.message, data: false });

    res.send({ data: result, error: null });
  });
});

router.post("/impressions", function (req, res) {
  var Stats = require("../libs/stats");

  req.body.facility_id = mongojs.ObjectId(req.body.facility_id);
  req.body.company_id = mongojs.ObjectId(req.body.company_id);
  req.body.ip = req.ip;

  Stats.add(req.body)
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.get("/facility/:slug", function (req, res) {
  var Facility = require("../libs/facility");

  var stages = [
    { $match: { slug: req.params.slug } },
    {
      $lookup: {
        from: "companies",
        localField: "company_id",
        foreignField: "_id",
        as: "company",
      },
    },
    { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "packages",
        localField: "plan_id",
        foreignField: "_id",
        as: "plan",
      },
    },
    { $unwind: { path: "$plan", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "adspots",
        let: { facility_id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$status", "active"] } },
                { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                { $expr: { $gt: ["$expires", new Date().getTime()] } },
              ],
            },
          },
        ],
        as: "spot",
      },
    },
    { $unwind: { path: "$spot", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "subscriptions",
        let: { facility_id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $or: [
                    { $expr: { $eq: ["$status", "active"] } },
                    { $expr: { $eq: ["$status", "free"] } },
                    { $expr: { $eq: ["$status", "waived"] } },
                  ],
                },
                { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                { $expr: { $gt: ["$subscription_end", new Date().getTime()] } },
              ],
            },
          },
        ],
        as: "subscription",
      },
    },
    { $unwind: { path: "$subscription", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "stats",
        let: { facility_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$facility_id", "$$facility_id"] } } },
          { $match: { $expr: { $eq: ["$type", "phone_views"] } } },
          { $count: "count" },
        ],
        as: "phone_views",
      },
    },
    { $unwind: { path: "$phone_views", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "reviews",
        let: { facility_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$facility_id", "$$facility_id"] } } },
          { $match: { $expr: { $eq: ["$status", "approved"] } } },
          {
            $group: {
              _id: null,
              avg: { $avg: "$rating.avg" },
              overallAvg: { $avg: "$rating.overall" },
              treatmentAvg: { $avg: "$rating.treatment" },
              accommodationAvg: { $avg: "$rating.accommodation" },
              staffAvg: { $avg: "$rating.staff" },
              valueAvg: { $avg: "$rating.value" },
              foodAvg: { $avg: "$rating.food" },
              total: { $sum: 1 },
            },
          },
        ],
        as: "review",
      },
    },
    { $unwind: { path: "$review", preserveNullAndEmptyArrays: true } },
  ];

  stages.push({
    $project: {
      name: 1,
      address: 1,
      address2: 1,
      city: 1,
      state: 1,
      zip: 1,
      contact: 1,
      protocol: 1,
      email: 1,
      website: 1,
      review: 1,
      company_id: 1,
      featured: 1,
      primaryFocus: 1,
      servicesProvided: 1,
      careType: 1,
      specialPrograms: 1,
      acceptedPayments: 1,
      paymentAssistance: 1,
      specialLanguage: 1,
      accreditations: 1,
      licensing: 1,
      membership: 1,
      category: 1,
      spot: 1,
      surveyCategory: 1,
      location: 1,
      showWebsite: 1,
      schoolInfo: 1,
      certifiedPartner: 1,
      subscription: 1,
      phone: 1,
      profile: 1,
      profile_type: 1,
      slug: 1,
    },
  });

  Facility.db.aggregate(stages, function (err, result) {
    if (err) return res.send({ error: err.message, data: false });

    if (!result.length) return res.send({ error: null, data: {} });
    var data = result[0];

    res.send({ error: null, data: data });
  });
});

router.get("/adspots", function (req, res) {
  var stages = [
    {
      $lookup: {
        from: "facilities",
        let: { facility_id: "$facility_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$_id", "$$facility_id"] } } },
          { $match: { $expr: { $eq: ["$subscription_status", "active"] } } },
        ],
        as: "reserved",
      },
    },
    { $unwind: { path: "$reserved", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        name: 1,
        price: 1,
        placement: 1,
        available: { $cond: [{ $gt: ["$reserved", null] }, 0, 1] },
      },
    },
  ];
  Adspot.db.aggregate(stages, function (err, results) {
    if (err) return res.send({ error: err.message });

    res.send({ error: null, data: results });
  });
});

router.get("/packages", function (req, res) {
  Package.db.find({}, function (err, results) {
    if (err) return res.send({ error: err.message });

    res.send({ error: null, data: results });
  });
});

router.get("/click2call", function (req, res) {
  Click2Call.db.find({ status: "active" }, function (err, results) {
    if (err) return res.send({ error: err.message });

    res.send({ error: null, data: results });
  });
});

router.get("/pressroom", function (req, res) {
  var PressRoom = require("../libs/pressroom");

  PressRoom.db.find({ visible: "yes" }, function (err, results) {
    if (err) return res.send({ error: err.message });

    res.send({ error: null, data: results });
  });
});

router.post("/facilities/check", async function (req, res) {
  Company.check(req.body.companyname)
    .then(function (company) {
      Facility.check(req.body.facilityname)
        .then(function (facility) {
          res.send({ error: null, facility: facility, company: company });
        })
        .catch(function (err) {
          res.send({ error: err.message, data: false });
        });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.post("/facilities", s3.upload.fields(s3.fields), async function (req, res) {
  req.body = JSON.parse(req.body.args);
  delete req.body.args
  if (req.body.location && req.body.location.coordinates.length) {
    req.body.location.coordinates = [
      Number(req.body.location.coordinates[0]),
      Number(req.body.location.coordinates[1]),
    ];
    req.body.location.type = "Point";
  } else {
    delete req.body.location;
  }
  req.body.status = "pending";

  let slug = req.body.name;
  if (req.body.city) slug = slug + "-" + req.body.city;
  if (req.body.state) slug = slug + "-" + req.body.state;
  req.body.slug = Facility.slugify(slug);

  if (req.files) {
    try {
      if (req.files.logo && req.files.logo.length) {
        req.body.profile.logo = await s3.saveSingle(req.files.logo[0]);
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }

  Facility.add(req.body).then(function (result) {
    global.events.emit("sendNewVendorNotification", req.body);
    res.send(result);
  }).catch(function (err) {
    return res.send({error: err.message, data: false});
  });
});

router.get("/facilities/:slug", function (req, res) {
  var Facility = require("../libs/facility");
  var Category = require("../libs/category");

  if (!req.params.slug) req.params.slug = "detox_center";

  Category.db.findOne({ slug: req.params.slug }, function (err, category) {
    if (err) return res.send({ error: err.message, data: false });

    if (!category) {
      return res.send({ error: 404, data: false });
    }

    var stages = [
      {
        $lookup: {
          from: "adspots",
          let: { facility_id: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $eq: ["$status", "active"] } },
                  { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                  { $expr: { $gt: ["$expires", new Date().getTime()] } },
                ],
              },
            },
          ],
          as: "spot",
        },
      },
      { $unwind: { path: "$spot", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "subscriptions",
          let: { facility_id: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $or: [
                      { $expr: { $eq: ["$status", "active"] } },
                      { $expr: { $eq: ["$status", "free"] } },
                      { $expr: { $eq: ["$status", "waived"] } },
                    ],
                  },
                  { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                  {
                    $expr: { $gt: ["$subscription_end", new Date().getTime()] },
                  },
                ],
              },
            },
          ],
          as: "subscription",
        },
      },
      { $unwind: { path: "$subscription", preserveNullAndEmptyArrays: true } },
    ];

    var filters = { status: "approved", category: { $in: [category.name] } };
    stages.push({
      $match: { status: "approved", category: { $in: [category.name] } },
    });
    stages.push({ $match: { "spot.status": { $ne: "active" } } });

    var page = req.query.page || 0;
    var max = req.query.max || 25;

    page = Number(page);
    max = Number(max);
    var skip = page * max;

    //remove profile if subscription ended
    stages.push({
      $project: {
        name: 1,
        address: 1,
        address2: 1,
        city: 1,
        state: 1,
        zip: 1,
        contact: 1,
        phone: 1,
        protocol: 1,
        email: 1,
        website: 1,
        review: 1,
        company_id: 1,
        featured: 1,
        primaryFocus: 1,
        servicesProvided: 1,
        careType: 1,
        specialPrograms: 1,
        acceptedPayments: 1,
        paymentAssistance: 1,
        specialLanguage: 1,
        accreditations: 1,
        licensing: 1,
        membership: 1,
        category: 1,
        surveyCategory: 1,
        location: 1,
        showWebsite: 1,
        certifiedPartner: 1,
        spot: 1,
        subscription: 1,
        profile: 1,
        profile_type: 1,
        slug: 1,
      },
    });

    stages.push({ $sort: { subscription: -1 } });

    if (page) {
      stages.push({ $skip: Number(skip) });
    }
    if (max) {
      stages.push({ $limit: Number(max) });
    }

    Facility.db.aggregate(stages, function (err, results) {
      if (err) return res.send({ error: err.message, data: false });

      Facility.db.count(filters, function (err, count) {
        if (err) return res.send({ error: err.message, data: false });

        res.send({
          error: null,
          data: { data: results, total: count },
          category: category,
        });
      });
    });
  });
});

router.get("/facilities", function (req, res) {
  var Facility = require("../libs/facility");

  var stages = [
    {
      $lookup: {
        from: "reviews",
        let: { facility_id: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$facility_id", "$$facility_id"] } } },
          { $match: { $expr: { $eq: ["$status", "approved"] } } },
          {
            $group: {
              _id: null,
              avg: { $avg: "$rating.avg" },
              overallAvg: { $avg: "$rating.overall" },
              treatmentAvg: { $avg: "$rating.treatment" },
              accommodationAvg: { $avg: "$rating.accommodation" },
              staffAvg: { $avg: "$rating.staff" },
              valueAvg: { $avg: "$rating.value" },
              foodAvg: { $avg: "$rating.food" },
              total: { $sum: 1 },
            },
          },
        ],
        as: "review",
      },
    },
    { $unwind: { path: "$review", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "adspots",
        let: { facility_id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                { $expr: { $eq: ["$status", "active"] } },
                { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                { $expr: { $gt: ["$expires", new Date().getTime()] } },
              ],
            },
          },
        ],
        as: "spot",
      },
    },
    { $unwind: { path: "$spot", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "subscriptions",
        let: { facility_id: "$_id" },
        pipeline: [
          {
            $match: {
              $and: [
                {
                  $or: [
                    { $expr: { $eq: ["$status", "active"] } },
                    { $expr: { $eq: ["$status", "free"] } },
                    { $expr: { $eq: ["$status", "waived"] } },
                  ],
                },
                { $expr: { $eq: ["$facility_id", "$$facility_id"] } },
                { $expr: { $gt: ["$subscription_end", new Date().getTime()] } },
              ],
            },
          },
        ],
        as: "subscription",
      },
    },
    { $unwind: { path: "$subscription", preserveNullAndEmptyArrays: true } },
  ];

  var filters = { status: "approved" };

  stages.push({ $match: { status: "approved" } });

  if (req.query.filters) {
    if (req.query.filters.featured) {
      stages.push({ $match: { featured: req.query.filters.featured } });
      filters.featured = req.query.filters.featured;
    }

    if (req.query.filters.costRange) {
      stages.push({
        $match: { "profile.costRange": req.query.filters.costRange },
      });
      filters.profile = {};
      filters.profile.costRange = req.query.filters.costRange;
    }

    if (
      req.query.filters.specialPrograms &&
      req.query.filters.specialPrograms.length
    ) {
      stages.push({
        $match: { specialPrograms: { $in: req.query.filters.specialPrograms } },
      });
      filters.specialPrograms = { $in: req.query.filters.specialPrograms };
    }

    if (req.query.filters.careType && req.query.filters.careType.length) {
      stages.push({
        $match: { careType: { $in: req.query.filters.careType } },
      });
      filters.careType = { $in: req.query.filters.careType };
    }

    if (req.query.filters.category) {
      stages.push({
        $match: { category: { $in: [req.query.filters.category] } },
      });
      filters.category = { $in: [req.query.filters.category] };
    }

    if (req.query.filters.sample) {
      stages.push({ $sample: { size: Number(req.query.filters.sample) } });
    }

    if (req.query.filters.name) {
      stages.push({
        $match: {
          name: {
            $regex: new RegExp(util.escapeRegex(req.query.filters.name), "gi"),
          },
        },
      });
      filters.name = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.name), "gi"),
      };
    }

    if (req.query.filters.services) {
      stages.push({ $match: { type_facility: req.query.filters.services } });
    }

    if (req.query.filters.state) {
      stages.push({
        $match: {
          state: {
            $regex: new RegExp(util.escapeRegex(req.query.filters.state), "gi"),
          },
        },
      });
      filters.state = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.state), "gi"),
      };
    }

    if (req.query.filters.address) {
      stages.push({
        $match: {
          address: {
            $regex: new RegExp(
              util.escapeRegex(req.query.filters.address),
              "gi"
            ),
          },
        },
      });
      filters.address = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.address), "gi"),
      };
    }

    if (req.query.filters.city) {
      stages.push({
        $match: {
          city: {
            $regex: new RegExp(util.escapeRegex(req.query.filters.city), "gi"),
          },
        },
      });
      filters.city = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.city), "gi"),
      };
    }

    if (req.query.filters.zip) {
      stages.push({
        $match: {
          zip: {
            $regex: new RegExp(util.escapeRegex(req.query.filters.zip), "gi"),
          },
        },
      });
      filters.zip = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.zip), "gi"),
      };
    }

    if (req.query.filters.country) {
      stages.push({
        $match: {
          country: {
            $regex: new RegExp(
              util.escapeRegex(req.query.filters.country),
              "gi"
            ),
          },
        },
      });
      filters.country = {
        $regex: new RegExp(util.escapeRegex(req.query.filters.country), "gi"),
      };
    }

    if (req.query.filters.lat && req.query.filters.lng) {
      if (!req.query.filters.radius) req.query.filters.radius = 25;

      stages.unshift({
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              Number(req.query.filters.lng),
              Number(req.query.filters.lat),
            ],
          },
          distanceField: "dist.calculated",
          maxDistance: Number(req.query.filters.radius) * 1609.34,
          includeLocs: "dist.location",
          spherical: true,
        },
      });

      filters.location = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              Number(req.query.filters.lng),
              Number(req.query.filters.lat),
            ],
          },
          $maxDistance: Number(req.query.filters.radius) * 1609.34,
        },
      };
    }
  }

  var page = req.query.page || 0;
  var max = req.query.max || 25;

  page = Number(page);
  max = Number(max);
  var skip = page * max;

  //remove profile if subscription ended
  stages.push({
    $project: {
      name: 1,
      address: 1,
      address2: 1,
      city: 1,
      state: 1,
      zip: 1,
      contact: 1,
      phone: 1,
      protocol: 1,
      email: 1,
      website: 1,
      featured: 1,
      review: 1,
      primaryFocus: 1,
      company_id: 1,
      servicesProvided: 1,
      careType: 1,
      specialPrograms: 1,
      acceptedPayments: 1,
      paymentAssistance: 1,
      specialLanguage: 1,
      accreditations: 1,
      licensing: 1,
      membership: 1,
      category: 1,
      surveyCategory: 1,
      location: 1,
      showWebsite: 1,
      certifiedPartner: 1,
      spot: 1,
      subscription: 1,
      profile: 1,
      slug: 1,
    },
  });

  if (req.query.orderby) {
    for (var k in req.query.orderby)
      req.query.orderby[k] = Number(req.query.orderby[k]);

    stages.push({ $sort: req.query.orderby });
    console.log({ $sort: req.query.orderby });
  }

  if (page) {
    stages.push({ $skip: Number(skip) });
  }
  if (max) {
    stages.push({ $limit: Number(max) });
  }

  Facility.db.aggregate(stages, function (err, result) {
    if (err) return res.send({ error: err.message, data: false });

    Facility.db.count(filters, function (err, count) {
      if (err) return res.send({ error: err.message, data: false });

      res.send({ error: null, data: result, total: count });
    });
  });
});

router.get("/expertvideos", function (req, res) {
  var ExpertVideo = require("../libs/expertvideo");

  var stages = [];
  stages.push({ $match: { visible: "yes" } });

  if (req.query.filters.sample) {
    stages.push({ $sample: { size: Number(req.query.filters.sample) } });
  }

  ExpertVideo.db.aggregate(stages, function (err, result) {
    if (err) return res.send({ error: err.message, data: false });

    res.send({ error: null, data: result });
  });
});

router.post("/reviews", function (req, res) {
  var Review = require("../libs/review");

  req.body.ip = req.ip;
  req.body.status = "pending";
  req.body.slug = req.body.slug;
  req.body.company_id = mongojs.ObjectId(req.body.company_id);

  req.body.rating.overall = Number(req.body.rating.overall);
  req.body.rating.treatment = Number(req.body.rating.treatment);
  req.body.rating.accommodation = Number(req.body.rating.accommodation);
  req.body.rating.staff = Number(req.body.rating.staff);
  req.body.rating.value = Number(req.body.rating.value);
  req.body.rating.food = Number(req.body.rating.food);

  req.body.rating.avg =
    (req.body.rating.overall +
      req.body.rating.treatment +
      req.body.rating.accommodation +
      req.body.rating.staff +
      req.body.rating.value +
      req.body.rating.food) /
    6;

  req.body.rating.avg = Math.round(req.body.rating.avg * 10) / 10;

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  req.body.stayDate = new Date(
    Number(req.body.year),
    months.indexOf(req.body.month),
    1
  );

  Review.add(req.body)
    .then(function (result) {
      res.send({ data: result, error: null });
    })
    .catch(function (err) {
      res.send({ error: err.message, data: false });
    });
});

router.use("*", function (req, res, next) {
  if (!req.data.credentials) {
    return res.status(401).send({ error: "Unauthenticated" });
  }
  next();
});

router.get("/user", function (req, res) {
  delete req.data.credentials.password;
  res.send({ error: null, user: req.data.credentials });
});

router.post("/logout", function (req, res) {
  res.send({ error: null, data: true });
});

router.post(
  "/profile-paypal",
  s3.upload.fields(s3.fields),
  async function (req, res) {
    if (!req.body.id || !req.body.args || !req.body.card)
      return res.send({ error: "Missing arguments", data: false });

    req.body.args = JSON.parse(req.body.args);
    req.body.args.company_id = req.data.credentials.company_id;

    try {
      var plan = await Package.get(req.body.args.plan_id);
    } catch (e) {
      return res.send({ error: e.message, data: false });
    }

    var cart = {};
    cart.description = plan.description;
    cart.id = plan._id;
    cart.name = plan.name;
    cart.total = plan.price;

    var orderData = {
      company_id: req.data.credentials.company_id,
      user_id: req.data.credentials._id,
    };

    // 2a. Get the order ID from the request body
    const orderID = req.body.orderID;

    // 3. Call PayPal to get the transaction details
    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

    let order;
    try {
      order = await payPalClient.client().execute(request);
    } catch (err) {
      // 4. Handle any errors from the call
      console.error(err);
      return res.send({ error: "We could not complete your order." });
    }

    // 6. Save the transaction in your database
    var items = await Transaction.getLineItems(cart);

    orderData.transaction_id = orderID;
    orderData.total = global.settings.standardTotal;
    orderData.tax = global.settings.tax;
    orderData.items = items.lineItem;
    orderData.order_type = "paypal";

    var exp = new Date();
    exp.setMonth(exp.getMonth() + 1);

    if (req.files) {
      try {
        if (req.files.logo && req.files.logo.length) {
          var logo = await s3.saveSingle(req.files.logo[0]);
          req.body.args.logo = logo;
        }
        if (req.files.image && req.files.image.length) {
          var images = await s3.saveMuliti(req.files.image);
          req.body.args.images = images;
        }
      } catch (e) {
        return res.send({ error: e.message, data: false });
      }
    }

    try {
      await Transaction.add(order);
      if (plan.featured && req.body.spot) {
        await Adspot.edit(req.body.spot_id, {
          status: "reserved",
          facility_id: mongojs.ObjectId(req.body.id),
        });
      }
      await Facility.edit(req.body.id, {
        expires: exp,
        activated: new Date(),
        profile: req.body.args,
        profile_type: req.body.args.type,
        claimed: "yes",
        plan_id: mongojs.ObjectId(req.body.plan_id),
        spot_id: mongojs.ObjectId(req.body.spot_id),
        featured: plan.featured,
      });
    } catch (e) {
      return res.send({ error: e.message, data: false });
    }
    // 7. Return a successful response to the client
    return res.send({ error: null, result: "success" });
  }
);

router.post("/claim", async function (req, res) {
  if (!req.body.id)
    return res.send({ error: "Missing arguments", data: false });

  try {
    await Facility.edit(req.body.id, {
      company_id: req.data.credentials.company_id,
    });
  } catch (e) {
    return res.send({ error: e.message, data: false });
  }

  global.events.emit("sendClaim", req.body.id);
  return res.send({ error: null, result: "success" });
});

router.post("/profile", s3.upload.fields(s3.fields), async function (req, res) {
  if (!req.body.id || !req.body.args || !req.body.card)
    return res.send({ error: "Missing arguments", data: false });

  if (req.files) {
    try {
      if (req.files.logo && req.files.logo.length) {
        var logo = await s3.saveSingle(req.files.logo[0]);
        req.body.args.logo = logo;
      }
      if (req.files.image && req.files.image.length) {
        var images = await s3.saveMuliti(req.files.image);
        req.body.args.images = images;
      }
    } catch (e) {
      return res.send({ error: e.message, data: false });
    }
  }

  try {
    req.body.args = JSON.parse(req.body.args);
    req.body.card = JSON.parse(req.body.card);
    req.body.args.company_id = req.data.credentials.company_id;
    var spot_id = "";

    var plan = await Package.get(req.body.plan_id);
    if (plan.featured) {
      var spot = await Adspot.available(req.body.spot);
      spot_id = spot._id;
    }
  } catch (e) {
    return res.send({ error: e.message, data: false });
  }

  var cart = {};
  cart.id = plan._id;
  cart.description = plan.description;
  cart.name = plan.name;
  cart.total = Number(plan.price);
  cart.tax = 0;

  if (plan.featured && spot && spot.price) {
    cart.total = cart.total + Number(spot.price);
  }

  var card = req.body.card;
  card.facility_id = mongojs.ObjectId(req.body.id);
  card.company_email = req.data.credentials.company
    ? req.data.credentials.company.email
    : card.email;
  var order = {
    company_id: req.data.credentials.company_id,
    user_id: req.data.credentials._id,
    facility_id: mongojs.ObjectId(req.body.id),
  };

  order.email = card.email;
  order.firstname = card.firstname;
  order.lastname = card.lastname;
  order.phone = card.phone;
  order.address = card.address;
  order.city = card.city;
  order.state = card.state;
  order.zip = card.zip;
  order.country = card.country;
  order.order_type = "card";

  order.total = cart.total;
  order.tax = cart.tax;

  var exp = new Date();
  exp.setMonth(exp.getMonth() + 1);
  exp = exp.getTime();

  var items = await Transaction.getLineItems([cart]);
  order.items = items.lineItem;
  cart.lineItems = items;

  var request = Transaction.createRequest(cart, card);
  Transaction.sendRequest(request, async function (err, result) {
    if (err) {
      return res.send({ error: err.message });
    }
    order.transaction_id = result.transactionId;
    order.order_type = "credit_card";

    try {
      await Transaction.add(order);
      if (plan.featured)
        await Adspot.edit(spot_id, {
          facility_id: mongojs.ObjectId(req.body.id),
          expires: exp,
        });
      await Subscription.add({
        facility_id: mongojs.ObjectId(req.body.id),
        subscription_end: exp,
        subscription_start: new Date(),
        package_id: mongojs.ObjectId(req.body.plan_id),
        payment: {
          email: card.email,
          firstname: card.firstname,
          status: "active",
          lastname: card.lastname,
          phone: card.phone,
          address: card.address,
          city: card.city,
          state: card.state,
          zip: card.zip,
          country: card.country,
          accountNumber: result.accountNumber,
          accountType: result.accountType,
          profile_id: result.profile_id,
          payment_id: result.payment_id,
        },
        company_id: req.data.credentials.company_id,
      });
      await Facility.edit(req.body.id, {
        company_id: req.data.credentials.company_id,
        claimed: "yes",
        profile: req.body.args,
        spot_id: spot_id,
        featured: plan.featured,
        profile_type: req.body.args.type,
      });
    } catch (e) {
      return res.send({ error: e.message, data: false });
    }

    global.events.emit("sendClaim", req.body.id);
    return res.send({ error: null, result: "success" });
  });
});

router.post(
  "/epic-checkout",
  s3.upload.fields(s3.fields),
  async function (req, res) {
    var cart = {};
    cart.id = plan._id;
    cart.description = "Epic Curriculum";
    cart.name = "Epic Curriculum";
    cart.total = Number(450);
    cart.tax = 0;

    var card = req.body.card;
    var order = {};

    order.email = card.email;
    order.firstname = card.firstname;
    order.lastname = card.lastname;
    order.phone = card.phone;
    order.address = card.address;
    order.city = card.city;
    order.state = card.state;
    order.zip = card.zip;
    order.country = card.country;
    order.order_type = "card";

    order.total = cart.total;
    order.tax = cart.tax;

    var items = await Transaction.getLineItems([cart]);
    order.items = items.lineItem;
    cart.lineItems = items;

    var request = Transaction.createRequest(cart, card);
    Transaction.sendRequest(request, function (err, result) {
      if (err) {
        return res.send({ error: err.message });
      }
      order.transaction_id = result.transactionId;
      order.order_type = "credit_card";

      Transaction.add(order)
        .then(function (result) {
          global.events.emit("sendEpic", req.body.id);
          return res.send({ error: null, result: "success" });
        })
        .catch(function (err) {
          return res.send({ error: e.message, data: false });
        });
    });
  }
);

module.exports = router;
