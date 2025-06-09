const express = require('express');
const router = express.Router();
const mongojs = require("mongojs");
const s3 = require("../../libs/s3");
const Banner = require("../../libs/banner_ads");

router.post('/', s3.upload.fields(s3.bannerField), async (req, res) => {
  let obj = {}

  obj.label = req.body.label
  obj.url = req.body.url
  obj.status = 'active'

  if (req.files) {
    try {
      if (req.files.creative && req.files.creative.length) {
        obj.creative = await s3.saveSingle(req.files.creative[0]);
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }

  Banner.add(obj).then(() => {
    res.send({error: null, created: true})
  }).catch((err) => {
    console.log('banner.ads.create', err)
    return res.send({error: err, data: false});
  })
})

router.post('/load', async (req, res) => {
  let filters = {};

  if (req.body.status) filters.status = req.body.status

  let stages = [
    {
      $match: filters
    },
    {
      '$skip': Number(req.body.page) * Number(req.body.max)
    },
    {
      '$limit': Number(req.body.max)
    }
  ]
  await Banner.db.count({}, (error, count) => {
    if (error) console.error('facility.category.count ', error)

    Banner.db.aggregate(stages, function (error, results) {
      if (error) return res.send({error: error.message, data: false});
      res.send({error: null, total: count, data: results});
    })
  })
})

router.get('/load-all', async (req, res) => {
  let filters = {};

  let stages = [
    {
      $match: filters
    }
  ]
  Banner.db.aggregate(stages, function (error, results) {
    if (error) return res.send({error: error.message, data: false});
    res.send(results);
  })
})

router.get('/:id', (req, res) => {
  Banner.get(req.params.id).then(( result) => {
    res.send(result)
  }).catch((error) => {
    return res.send({error: error.message});
  })
})

router.post('/update', s3.upload.fields(s3.bannerField), async  (req, res) => {
  req.body = JSON.parse(req.body.args)

  let id = req.body._id
  delete req.body._id

  if (req.files) {
    try {
      if (req.files.creative && req.files.creative.length) {
        req.body.creative = await s3.saveSingle(req.files.creative[0]);
      }
    } catch (e) {
      return res.send({error: e.message, data: false});
    }
  }

  Banner.db.update({_id: mongojs.ObjectId(id)}, req.body, (error) => {
    if (error) return res.send({error: error.message, data: false});
    res.send({updated: true});
  })
})

router.delete('/:id', (req, res) => {
  Banner.delete(mongojs.ObjectId(req.params.id)).then(() => {
    res.send({deleted: true})
  }).catch((err) => {
    return res.send({error: err});
  })
})

module.exports = router;
