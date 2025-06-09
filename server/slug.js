var utils = require("utils-pkg");
var mongojs = require("mongojs");
var fs = require('fs');

var connstr = 'mongodb://sober:s9cbeBTdCd6Lq6jnkFEyd6cn@mongo.sober.com,mongo1.sober.com/sober?replicaSet=sober-replica-set';
global.db = mongojs(connstr, null, {poolSize:3, autoReconnect: true});
global.db.on('error', function (err) {
  console.log('database error', err)
});

global.db.on('connect', function () {
  console.log('database connected', arguments);
});

function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

var Facility = global.db.collection('facilities');
var Meeting = global.db.collection('meetings');

function generateFacilitySlug() {
  Facility.find({slug: {$exists: false}}).toArray(function (err, facilities) {
    if(err) console.log(err);

    console.log('facilities ', facilities.length)
    utils.each(facilities, async function (x, facility, next) {
      try {
        let slug = facility.name;
        if(facility.city) slug = slug + '-' + facility.city;
        if(facility.state) slug = slug + '-' + facility.state;
        await Facility.update({_id: facility._id}, {$set: {slug: slugify(slug)}});
        next()
      } catch(e) {
        throw e
      }
    }, function(){
      console.log('slugified')
    });

  })
}

function generateMeetingSlug() {
  Meeting.find({}).toArray(function (err, meetings) {
    if(err) console.log(err);

    console.log('meetings ', meetings.length)
    utils.each(meetings, async function (x, meeting, next) {
      try {
        let slug = meeting.name;
        if(meeting.city) slug = slug + '-' + meeting.city;
        if(meeting.state) slug = slug + '-' + meeting.state;
        if(meeting.day) slug = slug + '-' + meeting.day;
        if(meeting.type) slug = slug + '-' + meeting.type;
        await Meeting.update({_id: meeting._id}, {$set: {slug: slugify(slug)}});
        next()
      } catch(e) {
        console.log(e)
      }
    }, function(){
      console.log('slugified')
    });

  })
}

function fixMeetingDuplicates() {
  Meeting.aggregate([{ $group: { _id: { slug: "$slug" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }]).toArray(function (err, meetings) {
    console.log('duplicates ', meetings.length);
    utils.each(meetings, function (x, meeting, next) {
      try {
        let append = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        utils.each(meeting.uniqueIds, async function (index, duplicate, nextDuplicate) {
          if(index != 0) {
            await Meeting.update({_id: duplicate}, {$set: {slug: meeting._id.slug + '-' + append[index]}});
          }
          nextDuplicate()
        }, function(){
          next();
        })
      } catch(e) {
        throw e
      }
    }, function(){
      console.log('done')
    })
  })
}

function fixFacilityDuplicates() {
  Facility.aggregate([{ $group: { _id: { slug: "$slug" }, uniqueIds: { $addToSet: "$_id" }, count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }]).toArray(function (err, facilities) {
    console.log('duplicates ', facilities.length);
    utils.each(facilities, function (x, facility, next) {
      try {
        let append = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        utils.each(facility.uniqueIds, async function (index, duplicate, nextDuplicate) {
          if(index != 0) {
            await Facility.update({_id: duplicate}, {$set: {slug: facility._id.slug + '-' + append[index]}});
          }
          nextDuplicate()
        }, function(){
          next();
        })
      } catch(e) {
        throw e
      }
    }, function(){
      console.log('done')
    })
  })
}

function generate301() {
  let redirect = [];
  Facility.find({}).toArray(function (err, facilities) {
    for(var i = 0; i < facilities.length; i++) {
      redirect.push({ from: `/facility/${facilities[i]._id}`, to: `/facility/${facilities[i].slug}` });
      if(i < (facilities.length - 1)) {
        fs.writeFile('./redirect.json', JSON.stringify(redirect), function (err) {
            if (err) {
              console.error('Crap happens');
            } else {
              console.log("file created")
            }
          }
        );
      }
    }

  })
}

fixMeetingDuplicates()
