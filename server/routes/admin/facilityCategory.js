const express = require('express'),
  router = express.Router(),
  util = require("../../utils"),
  facilityCategory = require('../../libs/facility_categories');
let Facility = require("../../libs/facility");
const mongojs = require("mongojs");

router.post('/', (req, res) => {

  req.body.status = 'active'
  req.body.created_ts = new Date()
  // req.body.created_by = req.user._id

  facilityCategory.db.insert(req.body, (error, result) => {
    if(error) return res.send({error: error.message, data: false});
    res.send({error: null, data: true});
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
  await facilityCategory.db.count({}, (error, count) => {
    if (error) console.error('facility.category.count ', error)

    facilityCategory.db.aggregate(stages, function (error, results) {
      if (error) return res.send({error: error.message, data: false});
      res.send({error: null, total: count, data: results});
    })
  })
})

router.post('/load-menu', async (req, res) => {
  let filters = {};

  filters.status = 'active'

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

router.post('/search', async (req, res) => {
  let filters = {};

  if (req.body.search) {
    filters.name = {$regex: new RegExp(util.escapeRegex(req.body.search), 'gi')};
    !req.body.all ? filters.status = 'active' : null
  }

  let stages = [
    {
      $match: filters
    }
  ]
  await facilityCategory.db.count({}, (error, count) => {
    if (error) console.error('facility.category.count ', error)

    facilityCategory.db.aggregate(stages, function (error, results) {
      if (error) return res.send({error: error.message, data: false});
      res.send({error: null, total: count, data: results});
    })
  })
})

router.get('/:id', (req, res) => {
  facilityCategory.get(req.params.id).then(( result) => {
    res.send(result)
  }).catch((error) => {
    return res.send({error: error.message});
  })
})

router.put('/', (req, res) => {
  let id = req.body._id
  delete req.body._id

  facilityCategory.db.update({_id: mongojs.ObjectId(id)}, req.body, (error, result) => {
    if (error) return res.send({error: error.message, data: false});
    res.send({error: null, data: result});
  })
})

router.post('/delete', (req, res) => {
  if (!req.body.delete) {
    let stages = [
      {
        $match: { vendor_category: { $in: [req.body.id.toString()] } }
      },
      {
        $count: 'total'
      }
    ]

    Facility.db.aggregate(stages, (error, results) => {
      if (error) console.log(error)

      if (results.length === 0 || results[0].total === 0) {
        facilityCategory.deleteCat(mongojs.ObjectId(req.body.id)).then((r) => {
          res.send(r)
        }).catch((e) => {
          res.send(e)
        })
      } else {
        res.send({deleted: false, message: `There ${results[0].total > 1 ? 'are' : 'is'} [${results[0].total}] Vendor${results[0].total > 1 ? 's' : ''} ${results[0].total > 1 ? 'that use' : 'that is using'} this category. Deleting will remove the category from ${results[0].total > 1 ? 'these' : 'this'} vendor${results[0].total > 1 ? 's' : ''}. Continue?` })
      }
    })
  }

  if (req.body.delete) {
    let stages = [
      {
        $match: { vendor_category: { $in: [req.body.id.toString()] }  }
      }
    ]

    Facility.db.aggregate(stages, (error, results) => {
      if (error) console.error(error)

      let arr = results.map(e => e._id)

      const bulkOp = Facility.db.initializeUnorderedBulkOp()

      for (let a = 0; a < arr.length; a++) {
        bulkOp.find({_id: mongojs.ObjectId(arr[a])}).updateOne({ $pull: { 'vendor_category': req.body.id.toString() } })
      }

      bulkOp.execute( (err, data) => {
        if (data.nUpserted > 0) {
          facilityCategory.deleteCat(mongojs.ObjectId(req.body.id)).then((r) => {
            res.send(r)
          }).catch((e) => {
            res.send(e)
          })
        }
      })
    })
  }
})

module.exports = router;
