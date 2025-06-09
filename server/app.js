
/*
 * App server
 * Description: The main application server for the platform
 */

//Declare required modules
// db.createUser(
//   {
//     user: "admin",
//     pwd: "HjtWNkEmNPs5bNrA",
//     roles: [ { role: "root", db: "admin" }]
//   }
// )

// db.createUser(
//   {
//     user: "sober",
//     pwd: "s9cbeBTdCd6Lq6jnkFEyd6cn",
//     roles: [ { role: "readWrite", db: "sober" }]
//   }
// )

// db.auth("admin", "HjtWNkEmNPs5bNrA")

// db.facilities.createIndex( { slug: 1 }, { unique: true } )
// db.facilities.createIndex( { categories: 1 }, { unique: false } )
// db.facilities.createIndex( { name: 1 }, { unique: false } )
// db.facilities.createIndex( { state: 1 }, { unique: false } )
// db.facilities.createIndex( { city: 1 }, { unique: false } )
// db.facilities.createIndex( { country: 1 }, { unique: false } )
// db.facilities.createIndex( { zip: 1 }, { unique: false } )
// db.facilities.createIndex( { services: 1 }, { unique: false } )

// db.meetings.createIndex( { slug: 1 }, { unique: true } )
// db.meetings.createIndex( { name: 1 }, { unique: false } )
// db.meetings.createIndex( { state: 1 }, { unique: false } )
// db.meetings.createIndex( { city: 1 }, { unique: false } )
// db.subscriptions.createIndex( { facility_id: 1 }, { unique: true } )
// db.adspots.createIndex( { facility_id: 1 }, { unique: true } )
// db.transactions.createIndex( { facility_id: 1 }, { unique: false } )
// db.reviews.createIndex( { facility_id: 1 }, { unique: false } )
// db.stats.createIndex( { facility_id: 1 }, { unique: false } )

// P=As}ATwL{p$}[i

var express = require("express"),
  compression = require("compression"),
  session = require("express-session"),
  path = require("path"),
  logger = require("morgan"),
  consola = require("consola"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  utils = require("utils-pkg"),
  cron = require("node-cron"),
  json2xls = require("json2xls"),
  // analytics = require('node-analytics'),
  mongojs = require("mongojs");

global.settings = { gateway: {} };

const { Nuxt, Builder } = require("nuxt");

//Initialize Express web server
var app = express();
app.use(json2xls.middleware);

//Enable compression
app.use(compression());

//Enable Cors
app.use(cors());

// Use connect method to connect to the Server
// var connstr = "mongodb://admin:HjtWNkEmNPs5bNrA@127.0.0.1:27017/dev?compressors=snappy,zlib&authSource=admin"; // DEV Created by D. Brown
// var connstr = "mongodb://sober:s9cbeBTdCd6Lq6jnkFEyd6cn@127.0.0.1:27017/sober?compressors=snappy,zlib"; // LIVE
var connstr = "mongodb+srv://sober:AVsNRT4wK60hIV7Q@sobercluster.fc37s6i.mongodb.net/sober?retryWrites=true&w=majority";
// var connstr = 'mongodb://sober:s9cbeBTdCd6Lq6jnkFEyd6cn@mongo.sober.com,mongo1.sober.com/sober?replicaSet=sober-replica-set';
global.db = mongojs(connstr, null, { poolSize: 10, autoReconnect: true });
global.db.on("error", function (err) {
  console.log("database error", err);
  global.db = mongojs(connstr, null, { poolSize: 10, autoReconnect: true });
});

global.db.on("connect", function () {
  global.events = require("./libs/hooks");
  console.log("database connected", arguments);
});

//Load additional libraries
var State = require("./libs/state"),
  Facility = require("./libs/facility"),
  Country = require("./libs/country");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 500000,
  })
);
app.use(cookieParser("$Yehoshua#1"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// trust first proxy
app.set("trust proxy", 1);
app.use(
  session({
    secret: "$Yehoshua#1",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//Gather routes
var routes = require("./routes/api");
var admin = require("./routes/admin");
var portal = require("./routes/portal");

//Setup routes
app.use("/api", routes);
app.use("/api/admin", admin);
app.use("/api/portal", portal);

global.states = [];
global.countries = [];
global.roles = [];
global.addresstypes = [];
global.credentials = null;
global.admin = null;
global.menus = []
global.blog_settings = {}
Exception = require("./libs/exception");
global.exception = Exception;
global.events = null;

//Specify the conversion method
global.enforceObjectId = function (source, suffix) {
  //Convert the _id fields to ObjectId that are not already
  suffix = suffix ? suffix : "_id";

  for (var property in source) {
    //Cycle the object properties
    if (source[property] == undefined || source[property] == null) continue;

    if (property.match(new RegExp(suffix, "i"))) {
      if (typeof source[property] == "string") {
        if (source[property].length >= 12) {
          source[property] = mongojs.ObjectId(source[property]);
        }
      }
    }
  }

  return source;
};

var Settings = require("./libs/settings");
var Role = require("./libs/role");
var Menu = require('./libs/menu');
var Blog = require('./libs/blog');
var Category = require("./libs/category");
var Transaction = require("./libs/transaction");
var Subscription = require("./libs/subscription");
let SitemapService = require('../server/services/sitemap')

Settings.load(function (err, result) {
  console.log("App.settings.load");
  global.settings = result || {
    company: "Sober",
    copyright: `&copy; ${new Date().getFullYear()} Sober. All rights reserved.`,
    email: "info@larvationweb.com",
  };
});

Role.db.find({}, function (err, result) {
  console.log("App.roles", err);
  global.roles = result ? result : [];
});

Menu.db.findOne({}, function (err, result) {
  console.error("App.menus", err);
  global.menus = result ? result : [];
});

Blog.db.findOne({}, {blog_widgets: 1, category_widgets: 1, layout: 1, widget_settings: 1, search_widgets: 1}, function (err, result) {
  console.error("App.blog_settings", err);
  if (result) delete result._id
  global.blog_settings = result ? result : {};
});

State.db.find({}, function (err, result) {
  console.log("App.states", err);
  global.states = result ? result : [];
});

Country.db.find({}, function (err, result) {
  console.log("App.countries", err);
  global.countries = result ? result : [];
});

Category.db.find({}, function (err, result) {
  console.log("App.category", err);
  global.categories = result ? result : [];
});

app.use(function (req, res, next) {
  req.settings = global.settings;
  delete req.settings.general.terms;
  delete req.settings.general.privacy;
  req.roles = global.roles;
  req.menus = global.menus;
  req.blog_settings = global.blog_settings;
  req.categories = global.categories;

  res.cookie("gkey", req.settings.general ? req.settings.general.map_key : "");
  next();
});

app.get('/sitemapindex.xml', function ( req, res, next ) {
  try {
    res.set('Cache-control', 'public, max-age=0');
    res.set('Content-Type', 'text/xml')
    res.sendFile(path.join(__dirname, 'sitemaps', `sitemapindex.xml`));
  } catch (e) {
    next(e)
  }
})

app.get('/sitemap-:type-:count.xml.gz', function ( req, res, next ) {
  try {
    let type = req.params.type ? '-' + req.params.type : ''
    let count = req.params.count ? '-' + req.params.count : ''

    res.set('Cache-control', 'public, max-age=0');
    res.set('Content-Type', 'application/gzip')
    res.sendFile(path.join(__dirname, 'sitemaps', `sitemap${type}${count}.xml.gz`));
  } catch (e) {
    next(e)
  }
})

app.get('/sitemap-:type-:count.xml', function ( req, res, next ) {
  try {
    let type = req.params.type ? '-' + req.params.type : ''
    let count = req.params.count ? '-' + req.params.count : ''

    res.set('Cache-control', 'public, max-age=0');
    res.set('Content-Type', 'application/gzip')
    res.sendFile(path.join(__dirname, 'sitemaps', `sitemap${type}${count}.xml`));
  } catch (e) {
    next(e)
  }
})

app.get('/test', (req,res) => {
	console.log('TEST')
})

app.get('/sitemap-static.xml', function ( req, res, next ) {
  try {
    res.set('Cache-control', 'public, max-age=0');
    res.set('Content-Type', 'text/xml')
    res.sendFile(path.join(__dirname, 'sitemaps', `sitemap-static.xml`));
  } catch (e) {
    next(e)
  }
})

cron.schedule("0 * * * *", () => {
  var stages = [
    {
      $lookup: {
        from: "facilities",
        localField: "facility_id",
        foreignField: "_id",
        as: "facility",
      },
    },
    { $unwind: { path: "$facility", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "packages",
        localField: "package_id",
        foreignField: "_id",
        as: "package",
      },
    },
    { $unwind: { path: "$package", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $and: [
          { $expr: { $lt: ["$subscription_end", new Date().getTime()] } },
          {
            $or: [
              { $expr: { $ne: ["$status", "canceled"] } },
              { $expr: { $ne: ["$status", "free"] } },
            ],
          },
        ],
      },
    },
  ];
  Subscription.db.aggregate(stages, function (err, subscriptions) {
    if (err) return;

    utils.each(
      subscriptions,
      async function (index, subscription, next) {
        if (!subscription.payment) {
          next();
        } else {
          var cart = {};
          cart.id = subscription.package._id;
          cart.description = subscription.package.description;
          cart.name = subscription.package.name;
          cart.total = Number(subscription.package.price);
          cart.tax = 0;

          var order = {
            company_id: subscription.facility.company_id,
            facility_id: subscription.facility_id,
          };
          order.email = subscription.payment.email;
          order.firstname = subscription.payment.firstname;
          order.lastname = subscription.payment.lastname;
          order.phone = subscription.payment.phone;
          order.address = subscription.payment.address;
          order.city = subscription.payment.city;
          order.state = subscription.payment.state;
          order.zip = subscription.payment.zip;
          order.country = subscription.payment.country;
          order.order_type = "card";

          order.total = cart.total;
          order.tax = cart.tax;

          var items = await Transaction.getLineItems([cart]);
          order.items = items.lineItem;
          cart.lineItems = items;

          var exp = new Date();
          exp.setMonth(exp.getMonth() + 1);
          exp.getTime();

          if (subscription.status === "waived") {
            Subscription.edit(subscription._id, {
              expires: exp,
              subscription_status: "active",
              subscription_error: "",
            });
            return next();
          } else {
            var request = Transaction.createCustomerChargeRequest(
              cart,
              subscription.customer
            );
            Transaction.sendRequest(request, async function (err, result) {
              if (err) {
                Subscription.update(
                  { _id: subscription._id },
                  {
                    $set: {
                      subscription_status: "suspended",
                      subscription_error: err.message,
                    },
                  }
                );
                return next();
              }

              order.transaction_id = result.transactionId;

              try {
                await Transaction.add(order);
                await Subscription.edit(subscription._id, {
                  expires: exp,
                  subscription_status: "active",
                  subscription_error: "",
                });
              } catch (e) {
                console.log(e);
              }

              next();
            });
          }
        }
      },
      function () {
        console.log("billing completed");
      }
    );
  });
});

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

 cron.schedule("0 0 * * 1,4", () => {
  console.log('Initiating Sitemap Service')
  let url = process.env.NODE_ENV === ' development' ? 'http://localhost:3002' :'http://167.71.95.245/'
  SitemapService.sitemap(url)
 }, {})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  console.log(`Worker ${process.pid} started...`);

  // Listen the server
  //require("greenlock-express")
    //.init({
      //packageRoot: path.join(__dirname, "../"),
      //configDir: "./greenlock.d",

      // contact for security and critical bug notices
      //maintainerEmail: "dayneirbrown@gmail.com",

      // whether or not to run at cloudscale
      //cluster: false,
    //})
  //  .serve(app);

   app.listen(port, host);
  // const io = require('socket.io')(app);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();
