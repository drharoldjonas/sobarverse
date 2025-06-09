// Use connect method to connect to the Server
const Meetings = require("../libs/meeting");
const Facility = require("../libs/facility");
const { createGzip } = require("zlib");
const moment = require('moment')
const { create } = require('xmlbuilder2');
const mongojs = require("mongojs");
const path = require("path");
const fs = require('fs');
let db = {}

// var connstr = "mongodb://admin:HjtWNkEmNPs5bNrA@127.0.0.1:27017/dev?compressors=snappy,zlib&authSource=admin"; // DEV Created by D. Brown
var connstr = "mongodb://sober:s9cbeBTdCd6Lq6jnkFEyd6cn@127.0.0.1:27017/sober?compressors=snappy,zlib"; // LIVE
// var connstr = 'mongodb://sober:s9cbeBTdCd6Lq6jnkFEyd6cn@mongo.sober.com,mongo1.sober.com/sober?replicaSet=sober-replica-set';
db = mongojs(connstr, null, { poolSize: 10, autoReconnect: true });
db.on("error", function (err) {
  console.log("database error", err);
  db = mongojs(connstr, null, { poolSize: 10, autoReconnect: true });
});

db.on("connect", function () {
  global.events = require("../libs/hooks");
  console.log("DB connected");
});

const map = {}
let staticRoutes = ['advertising','directory','blog','match','pressroom','privacy','support','terms','directory/search','meeting','facility/category']

map.sitemap = ( baseURL ) => {
  console.log('Initiating Sitemap CRON')

  Meetings.loadData().then(async (c) => {
    let bunch = []
    let bunchSize = 10000
    let bunchCount = 0

    bunchCount = Math.ceil(c / bunchSize)

    for (let i = 0; i < bunchCount; i++) {
      bunch.push({
        file: `sitemap-meetings${bunchCount < 2 ? '' : '-' + (i + 1)}.xml`,
        cacheTime: 1000,
        routes: await grabMeetings(i * bunchSize, bunchSize, baseURL).then((a) => { return a })
      })
    }
    createXML(bunch)
  }).then(() =>{
    Facility.loadData().then(async (c) => {
      let bunch = []
      let bunchSize = 10000
      let bunchCount = 0

      bunchCount = Math.ceil(c / bunchSize)

      for (let i = 0; i < bunchCount; i++) {
        bunch.push({
          file: `sitemap-facilities${bunchCount < 2 ? '' : '-' + (i + 1)}.xml`,
          cacheTime: 1000,
          routes: await grabFacilities(i * bunchSize, bunchSize, baseURL).then((a) => { return a })
        })
      }
      createXML(bunch)
    }).then(() => {
      StaticRoutes(baseURL).then((bunch) => {
        createXML(bunch)
      })

      cleanZIPS().then(() => {
        createIndexXML(baseURL)
      })
    })
  })
}

function grabMeetings(from, size, fullURL) {
  return new Promise((resolve, reject) => {
    let array = []
    let stages = [
      {$match: {}},
      {$project: { slug: 1, created_ts: 1, modified_ts: 1}},
      {$skip: from},
      {$limit: size}
    ]

    Meetings.db.aggregate(stages, function (err, result) {
      if (err) console.log('sitemap.service ', err)
      resolve(
        result.map((meetings) => {
          return {
            loc: `${fullURL}/meeting/${meetings.slug}`,
            lastmod: moment(new Date(meetings.modified_ts ? meetings.modified_ts : meetings.created_ts)).format('YYYY-MM-DD')
          }
      }))
    })
  })
}

function StaticRoutes(baseURL) {
  return new Promise((resolve) => {
    let bunch = []
    let bunchCount = 0

    bunch.push({
      file: `sitemap-static${bunchCount < 2 ? '' : '-' + (i + 1)}.xml`,
      routes: staticRoutes.map((stat) => {
        return {
          loc: `${baseURL}/${stat}`
        }
      })
    })

    if (bunch.length > 0) {
      resolve(bunch)
    }
  })
}

function grabFacilities(from, size, fullURL) {
  return new Promise((resolve, reject) => {
    let array = []
    let stages = [
      {$match: {}},
      {$project: { slug: 1, created_ts: 1, modified_ts: 1}},
      {$skip: from},
      {$limit: size}
    ]

    Facility.db.aggregate(stages, function (err, result) {
      if (err) console.log('sitemap.service ', err)
      resolve(
        result.map((facilities) => {
          return {
            loc: `${fullURL}/facility/${facilities.slug}`,
            lastmod: moment(new Date(facilities.modified_ts ? facilities.modified_ts : facilities.created_ts)).format('YYYY-MM-DD')
          }
      }))
    })
  })
}

function createXML(array) {
  new Promise((resolve) => {
    try {
      for (let i = 0; i < array.length; i++) {
        let obj = {
          urlset: {
            '@xmlns':"http://www.sitemaps.org/schemas/sitemap/0.9",
            // '@xmlns:news': "http://www.google.com/schemas/sitemap-news/0.9",
            // '@xmlns:xhtml': "http://www.w3.org/1999/xhtml",
            // '@xmlns:mobile': "http://www.google.com/schemas/sitemap-mobile/1.0",
            // '@xmlns:image': "http://www.google.com/schemas/sitemap-image/1.1",
            // '@xmlns:video': "http://www.google.com/schemas/sitemap-video/1.1",
            url: array[i].routes
          }
        }
        let doc = create({ version: '1.0', encoding: 'UTF-8' }, obj).doc()
        let pathz = path.join(__dirname, '..', 'sitemaps', `${array[i].file}`)
        fs.writeFileSync(pathz, doc.end({ prettyPrint: true }))
      }
      resolve('XML File Created')
    } catch (e) {
      console.log(e)
    }
  }).then((print) => {
    console.log(print)
  })
}

async function createIndexXML(baseURL) {
  new Promise((resolve) => {
    fs.readdir(path.join(__dirname, '..', 'sitemaps'), {withFileTypes: true}, function (err, files) {
      resolve(
        {
          url: files.map((u) => {return `${baseURL}/${u.name}`}),
          arr: files.map((u) => {
            if (u.name.includes('xml') && u.name !== 'sitemapindex.xml' ) {
              return {
                loc: `${baseURL}/${u.name}`,
                lastmod: moment(new Date()).format('YYYY-MM-DD')
              }
            }
          })
        }
      )
    })
  }).then((url) => {
    try {
      let obj = {
        sitemapindex: {
          '@xmlns':"http://www.sitemaps.org/schemas/sitemap/0.9",
          sitemap: url.arr
        }
      }

      let doc = create({ version: '1.0', encoding: 'UTF-8' }, obj).doc()
      let pathz = path.join(__dirname, '..', 'sitemaps', `sitemapindex.xml`)
      fs.writeFileSync(pathz, doc.end({ prettyPrint: true }))

      handleFiles(url.url)
    } catch (e) {
      console.log(e)
    }
  })
}

function handleFiles(file) {
  try {
    if (file.length > 0) {
      for ( let f = 0; f < file.length; f++ ) {
        let name = file[f].replace(/^http[s]?:\/\/.+?\//, '')

        if ( !name.includes('gz') && name.includes('xml') && name !== 'sitemapindex.xml' && name !== 'sitemap-static.xml' ) {
          const stream = fs.createReadStream(path.join(__dirname, '..', 'sitemaps', name));
          stream
            .pipe(createGzip())
            .pipe(fs.createWriteStream(path.join(__dirname, '..', 'sitemaps', `${name}.gz`)))
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}

function cleanZIPS() {
  return new Promise((resolve) => {
    fs.readdir(path.join(__dirname, '..', 'sitemaps'), {withFileTypes: true}, function (err, files) {
      if (files.length > 0) {
        for (let p = 0; p < files.length; p++) {
          if (files[p].name.includes('gz')) {
            fs.unlinkSync(path.join(__dirname, '..', 'sitemaps', `${files[p].name}`))
          }
        }
        console.log('Cleaned ZIPs')
        resolve(true)
      } else {
        console.log('No files found.')
        resolve(true)
      }
    })
  })
}

module.exports = map
