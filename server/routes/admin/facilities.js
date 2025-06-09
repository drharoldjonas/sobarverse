var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs"),
    URL = require('url'),
    utils = require("utils-pkg"),
    util = require("../../utils"),
    multer = require('multer'),
    crypto = require('crypto'),
    s3 = require("../../libs/s3");
var Facility = require("../../libs/facility");
let facilityCategory = require('../../libs/facility_categories');
const Fa = require("vuejs-datepicker/dist/locale/translations/fa");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    let customFileName = crypto.randomBytes(18).toString('hex'),
      fileExtension = file.originalname.split('.')[1] // get file extension from original file name
    cb(null, customFileName + '.' + fileExtension)
  }
});

var upload = multer({storage: storage});

router.get('/', function(req, res) {
    var opts = req.query || {};
    var filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    if (req.query.sSearch) {
        opts.filters.name = {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')};
    }

    Facility.list(opts).then(function(result){ res.send({ data: result }) }).catch(function(err){ res.send({error: err.message, data: false}); });
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

  if (req.files) {
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

router.put('/upload', upload.single('file'), function (req, res) {
  var csv = require('csvtojson');

  csv().fromFile(req.file.path).then((facilities) => {

    var bulkop = Facility.db.initializeUnorderedBulkOp();
    var count = 0;
    var batch_count = 0;

    console.log(facilities.length);
    utils.each(facilities, function (index, facility, next) {

      bulkop.find({name: facility.name1}).updateOne({$set: {type_facility: facility.type_facility}});

      count++;
      if (index == (facilities.length - 1)) {
        Facility.createBatch(bulkop).then(function (result) {
          bulkop = Facility.db.initializeUnorderedBulkOp();
          count = 0;
          setTimeout(function () {
            next()
          })
        }).catch(function (err) {
          setTimeout(function () {
            next()
          })
        });
      } else {
        if (count == 2000) {
          batch_count++;
          console.log(batch_count)
          Facility.createBatch(bulkop).then(function (result) {
            bulkop = Facility.db.initializeUnorderedBulkOp();
            count = 0;
            setTimeout(function () {
              next()
            })
          }).catch(function (err) {
            setTimeout(function () {
              next()
            })
          });
        } else {
          setTimeout(function () {
            next()
          })
        }
      }

    }, function () {
      console.log('done')
    })

  })

});

router.post('/upload', upload.single('file'), function (req, res) {
  var csv = require('csvtojson');

  csv().fromFile(req.file.path).then((facilities) => {

    var bulkop = Facility.db.initializeUnorderedBulkOp();
    var count = 0;
    var batch_count = 0;

    console.log(facilities.length);
    utils.each(facilities, function(index, facility, next){

      facility.category = ["Adolescent Services", "Alternative Drug Rehab Programs", "Outpatient Treatment", "Drug Detox Centers", "Drug and Alcohol Treatment Centers", "Housing", "Non 12 Step"]

      var primaryFocus = [];
      var servicesProvided = [];
      var careType = [];
      var specialPrograms = [];
      var paymentAssistance = [];
      var acceptedPayments = [];
      var specialLanguage = [];
      var category = [];

      if(facility.gh) primaryFocus.push('General health');
      if(facility.ma) primaryFocus.push('Mental health');
      if(facility.mhsa) primaryFocus.push('Mix of mental health and substance abuse');
      if(facility.sa) primaryFocus.push('Substance abuse treatment');

      if(facility.sa) servicesProvided.push('Substance abuse treatment');
      if(facility.dt) servicesProvided.push('Detoxification');
      if(facility.mm) servicesProvided.push('Methadone Maintenance');
      if(facility.md) servicesProvided.push('Methadone Detoxification');
      if(facility.bu) servicesProvided.push('Buprenorphine Services');
      if(facility.hh) servicesProvided.push('HalfWay house');

      if(facility.hi) careType.push('Hospital inpatient');
      if(facility.op) careType.push('Outpatient');
      if(facility.phdt) careType.push('Partial hospitalization/day treatment');
      if(facility.res) careType.push('Residential long-term treatment (more than 30 days)');
      if(facility.res) careType.push('Residential short-term treatment (30 days or less)');


      if(facility.tay) specialPrograms.push('Adolescents');
      if(facility.cj) specialPrograms.push('Criminal justice clients');
      if(facility.cj) specialPrograms.push('DUI/DWI offenders');
      if(facility.gl) specialPrograms.push('Gays and Lesbians');
      if(facility.hv) specialPrograms.push('Persons with HIV/AIDS');
      if(facility.se) specialPrograms.push('Seniors/older adults');

      if(facility.pa) paymentAssistance.push('Payment assistance (Check with facility for details)');
      if(facility.ss) paymentAssistance.push('Sliding fee scale (Fee is based on income and other factors)');

      if(facility.itu || facility.clf || facility.cmhg || facility.csbg || facility.scjj || facility.sef || facility.osf || facility.si || facility.smha || facility.swfs || facility.vaf) acceptedPayments.push('Access to Recovery voucher');
      if(facility.mc) acceptedPayments.push('Medicare');
      if(facility.md) acceptedPayments.push('Medicaid');
      if(facility.mi) acceptedPayments.push('Military Insurance');
      if(facility.pi) acceptedPayments.push('Private health insurance');
      if(facility.sf) acceptedPayments.push('Self payment');
      if(facility.si) acceptedPayments.push('State Financed (other than Medicaid)');

      if(facility.ah) specialLanguage.push('ASL or other assistance for hearing impaired');
      if(facility.sp) specialLanguage.push('Spanish');

      if(facility.tay) category.push('Adolescent Services');
      if(facility.at) category.push('Alternative Drug Rehab Programs');
      if(facility.op) category.push('Outpatient Treatment');
      if(facility.hh) category.push('Drug Detox Centers');
      if(facility.dt) category.push('Drug and Alcohol Treatment Centers');
      if(facility.hs) category.push('Housing');
      // category.push('Non 12 Step');

      var location;
      if(facility.longitude && facility.latitude) {
        location = {type: 'Point', coordinates: [Number(facility.longitude), Number(facility.latitude)]}
      }

      var protocol = '';
      var website = '';
      if(facility.website) {
        try {
          var url = URL.parse(facility.website);
        } catch(e) {
          console.log(e)
        }
      }

      if(url) {
        protocol = url.protocol;
        website = url.host;
      }

      bulkop.insert({
        name: facility.name1,
        name2: facility.name2,
        address: facility.street1,
        address2: facility.street2 || '',
        city: facility.city,
        state: facility.state,
        zip: facility.zip,
        county: facility.county,
        phone: facility.phone,
        protocol: protocol,
        website: website,
        location: location,
        specialLanguage: specialLanguage,
        category: category,
        acceptedPayments: acceptedPayments,
        paymentAssistance: paymentAssistance,
        specialPrograms: specialPrograms,
        careType: careType,
        servicesProvided: servicesProvided,
        primaryFocus: primaryFocus,
        type_facility: facility.type_facility,
        upload: 'yes',
        source_last_updated: new Date(facility.last_update).getTime(),
        created_ts: new Date().getTime()
      });

      count++;
      if(index == (facilities.length -1)) {
        Facility.createBatch(bulkop).then(function(result){
          bulkop = Facility.db.initializeUnorderedBulkOp();
          count = 0;
          setTimeout(function() { next() })
        }).catch(function (err) {
          setTimeout(function() { next() })
        });
      } else {
        if(count == 2000) {
          batch_count++;
          console.log(batch_count)
          Facility.createBatch(bulkop).then(function(result){
            bulkop = Facility.db.initializeUnorderedBulkOp();
            count = 0;
            setTimeout(function() { next() })
          }).catch(function (err) {
            setTimeout(function() { next() })
          });
        } else {
          setTimeout(function() { next() })
        }
      }

    }, function() {
      res.send({error: null, data: true})
    })

  }).catch((err) => {
    res.send({error: err.message, data: false});
  });
});

router.post('/upload/housing', upload.single('file'), function (req, res) {
  var csv = require('csvtojson');

  csv().fromFile(req.file.path).then((facilities) => {

    var bulkop = Facility.db.initializeUnorderedBulkOp();
    var count = 0;
    var batch_count = 0;

    console.log(facilities.length);
    utils.each(facilities, function(index, facility, next){

      var location;
      if(facility['Listing Longitude'] && facility['Listing Latitude']) {
        location = {type: 'Point', coordinates: [Number(facility['Listing Longitude']), Number(facility['Listing Latitude'])]}
      }

      console.log(facility);

      var protocol = '';
      var website = '';
      if(facility['Listing URL']) {
        if(facility['Listing URL'].search('http://') == -1 && facility['Listing URL'].search('https://') == -1) facility['Listing URL'] = 'http://' + facility['Listing URL'];
        try {
          var url = URL.parse(facility['Listing URL']);
        } catch(e) {
          console.log(e)
        }
      }

      if(url) {
        protocol = url.protocol || 'http://';
        website = url.host + url.pathname;
      }

      bulkop.insert({
        name: facility['Listing Title'],
        name2: facility['Listing SEO Title'],
        address: facility['Listing Address'],
        address2: facility['Listing Address2'] || '',
        city: facility['Listing City'],
        state: facility['Listing State'],
        category: ['Drug and Alcohol Treatment Centers', 'Housing'],
        zip: facility['Listing Postal Code'],
        county: 'US',
        phone: facility['Listing Phone'],
        email: facility['Listing Email'],
        protocol: protocol,
        website: website,
        location: location,
        upload: 'yes',
        upload_source: 'http://www.halfwayhouses.com',
        created_ts: new Date().getTime()
      });

      count++;
      if(index == (facilities.length -1)) {
        Facility.createBatch(bulkop).then(function(result){
          bulkop = Facility.db.initializeUnorderedBulkOp();
          count = 0;
          setTimeout(function() { next() })
        }).catch(function (err) {
          setTimeout(function() { next() })
        });
      } else {
        if(count == 2000) {
          batch_count++;
          console.log(batch_count)
          Facility.createBatch(bulkop).then(function(result){
            bulkop = Facility.db.initializeUnorderedBulkOp();
            count = 0;
            setTimeout(function() { next() })
          }).catch(function (err) {
            setTimeout(function() { next() })
          });
        } else {
          setTimeout(function() { next() })
        }
      }

    }, function() {
      res.send({error: null, data: true})
    })

  }).catch((err) => {
    res.send({error: err.message, data: false});
  });
});

router.delete('/:id', function(req, res) {
    Facility.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/add-categories', (req, res) => {
  try {
    let categories = req.body.categories || []
    let vendors = req.body.vendors || []

    const bulkOp = Facility.db.initializeUnorderedBulkOp()

    for (let v= 0; v < vendors.length; v++) {
      bulkOp.find({_id: mongojs.ObjectId(vendors[v])}).updateOne({ $addToSet: { vendor_category: { $each: categories } } })
    }

    bulkOp.execute((err, data) => {
      if (err) console.error(err)
      if (data.nUpserted > 0) {
        res.send({updated: true})
      }
    })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
