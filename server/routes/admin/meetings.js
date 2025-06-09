var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    crypto = require('crypto'),
    utils = require('utils-pkg'),
    mongojs = require("mongojs");
var Meeting = require("../../libs/meeting");
var util = require("../../utils");

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

router.get('/', function (req, res) {
    var opts = req.query || {};
    var filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    if (req.query.sSearch) {
        opts.filters['$or'] = [
          {name: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
          {address: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
          {state: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
          {city: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
          {zip: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}}
        ]
    }

    opts.orderby = { _id: -1 };

    if(opts.filters.status == 'pending') {
      opts.filters.$or = [{status: 'pending'}, {mod_status: 'pending'}];
      delete opts.filters.status
      opts.orderby = { modified_ts: -1 };
    }

    Meeting.gets(opts).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.get('/:id', function(req, res) {
    Meeting.get(req.params.id).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function (req, res) {
    req.body.args.status = 'pending';
    req.body.args.is = 'NEW';

    if(req.body.args.location) {
      req.body.args.location.coordinates = [Number(req.body.args.location.coordinates[0]), Number(req.body.args.location.coordinates[1])];
      req.body.args.location.type = "Point";
    }

    let slug = req.body.args.name;
    if(req.body.args.city) slug = slug + '-' + req.body.args.city;
    if(req.body.args.state) slug = slug + '-' + req.body.args.state;
    if(req.body.args.day) slug = slug + '-' + req.body.args.day;
    if(req.body.args.type) slug = slug + '-' + req.body.args.type;
    req.body.args.slug = Meeting.slugify(slug);

    Meeting.add(req.body.args).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.post('/upload/fix', upload.single('file'), function (req, res) {
  var csv = require('csvtojson');
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  csv().fromFile(req.file.path).then((meetings) => {

    var bulkop = Meeting.db.initializeUnorderedBulkOp();
    var count = 0;
    var batch_count = 0;

    console.log(meetings.length);
    utils.each(meetings, function(index, meeting, next){

      if(meeting['typeID']) {
        if(meeting['typeID'] == 1) {
          req.body.type = 'na'
        } else if(meeting['typeID'] == 2) {
          req.body.type  = 'aa'
        }
      }

      var location;
      if(meeting.longitude && meeting.latitude) {
        location = { type: "Point", coordinates: [Number(meeting.longitude), Number(meeting.latitude)] }
      }

      bulkop.find({
        name: meeting.name,
        day: days[(Number(meeting['dayID'])-1)],
        ctp: !!meeting.close,
        wheelChair: !!meeting.wheelchair,
        address: meeting.address_street1,
        address2: meeting.address_street2 || '',
        city: meeting.address_city,
        state: meeting.address_state,
        zip: meeting['address_ZIP'],
        location: location,
        type: req.body.type,
        time_stamp: meeting['time_asEntered'],
        status: 'approved',
        upload: 'yes'
      }).updateOne({$set: {time_utc: new Date(meeting['time_asEntered']).getTime(),}});

      count++;
      if(index == (meetings.length -1)) {
        Meeting.createBatch(bulkop).then(function(result){
          bulkop = Meeting.db.initializeUnorderedBulkOp();
          count = 0;
          setTimeout(function() { next() })
        }).catch(function (err) {
          setTimeout(function() { next() })
        });
      } else {
        if(count == 2000) {
          batch_count++;
          console.log(batch_count)
          Meeting.createBatch(bulkop).then(function(result){
            bulkop = Meeting.db.initializeUnorderedBulkOp();
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

router.post('/upload', upload.single('file'), function (req, res) {
  var csv = require('csvtojson');
  var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  csv().fromFile(req.file.path).then((meetings) => {

    var bulkop = Meeting.db.initializeUnorderedBulkOp();
    var count = 0;
    var batch_count = 0;

     console.log(meetings.length);
     utils.each(meetings, function(index, meeting, next){

       if(meeting['typeID']) {
         if(meeting['typeID'] == 1) {
           req.body.type = 'na'
         } else if(meeting['typeID'] == 2) {
           req.body.type  = 'aa'
         }
       }

       var location;
       if(meeting.longitude && meeting.latitude) {
         location = { type: "Point", coordinates: [Number(meeting.longitude), Number(meeting.latitude)] }
       }

       let slug = meeting.name;
       if(meeting.address_city) slug = slug + '-' + meeting.address_city;
       if(meeting.address_state) slug = slug + '-' + meeting.address_state;
       if(meeting['dayID']) slug = slug + '-' + days[(Number(meeting['dayID'])-1)];
       if(req.body.type) slug = slug + '-' + req.body.type;
       slug = Meeting.slugify(slug);

       bulkop.insert({
         name: meeting.name,
         day: days[(Number(meeting['dayID'])-1)],
         ctp: !!meeting.close,
         wheelChair: !!meeting.wheelchair,
         address: meeting.address_street1,
         address2: meeting.address_street2 || '',
         city: meeting.address_city,
         state: meeting.address_state,
         zip: meeting['address_ZIP'],
         location: location,
         type: req.body.type,
         meeting_created: new Date(meeting['TS_created']).getTime(),
         created_ts: new Date().getTime(),
         time_utc: new Date(meeting['time_asEntered']).getTime(),
         time_stamp: meeting['time_asEntered'],
         status: 'approved',
         upload: 'yes',
         slug: slug
       });

       count++;
       if(index == (meetings.length -1)) {
         Meeting.createBatch(bulkop).then(function(result){
           bulkop = Meeting.db.initializeUnorderedBulkOp();
           count = 0;
           setTimeout(function() { next() })
         }).catch(function (err) {
           setTimeout(function() { next() })
         });
       } else {
         if(count == 2000) {
           batch_count++;
           console.log(batch_count)
           Meeting.createBatch(bulkop).then(function(result){
             bulkop = Meeting.db.initializeUnorderedBulkOp();
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

router.post('/approve', function (req, res) {
    if(req.body.meetings) {
      Meeting.batchEdit(req.body.meetings, {status: 'approved'}).then(function (result) {
        res.send({error: null, data: result})
      }).catch(function (err) {
        res.send({error: err.message, data: false});
      });
    } else {
      Meeting.edit(req.body.id, {status: 'approved'}).then(function (result) {
        res.send({error: null, data: result})
      }).catch(function (err) {
        res.send({error: err.message, data: false});
      });
    }
});

router.post('/reject', function (req, res) {
    if(req.body.meetings) {
      Meeting.batchEdit(req.body.meetings, {status: 'rejected'}).then(function (result) {
        res.send({error: null, data: result})
      }).catch(function (err) {
        res.send({error: err.message, data: false});
      });
    } else {
      Meeting.edit(req.body.id, {status: 'rejected'}).then(function (result) {
        res.send({error: null, data: result})
      }).catch(function (err) {
        res.send({error: err.message, data: false});
      });
    }
});

router.post('/delete/approve', function (req, res) {
  Meeting.delete(req.body.id).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.post('/modify/approve', function (req, res) {
  req.body.args.new_data = null;
  req.body.args.is = 'NEW';
  req.body.args.mod_status = 'approved';
  Meeting.edit(req.body.id, req.body.args).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.post('/delete/reject', function (req, res) {
  Meeting.edit(req.body.id, {mod_status: 'rejected'}).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.post('/modify/reject', function (req, res) {
  Meeting.edit(req.body.id, {mod_status: 'rejected'}).then(function (result) {
    res.send({error: null, data: result})
  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
});

router.put('/', function (req, res) {
    if(req.body.args.location) {
      req.body.args.location.coordinates = [Number(req.body.args.location.coordinates[0]), Number(req.body.args.location.coordinates[1])];
      req.body.args.location.type = "Point";
    }

    let slug = req.body.args.name;
    if(req.body.args.city) slug = slug + '-' + req.body.args.city;
    if(req.body.args.state) slug = slug + '-' + req.body.args.state;
    if(req.body.args.day) slug = slug + '-' + req.body.args.day;
    if(req.body.args.type) slug = slug + '-' + req.body.args.type;
    req.body.args.slug = Meeting.slugify(slug);

    Meeting.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.delete('/:id', function (req, res) {
    Meeting.delete(req.params.id).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

module.exports = router;
