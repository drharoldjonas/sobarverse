var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs");
var FormFill = require("../../libs/formfill");

router.get('/', function (req, res) {
    var opts = req.query.opts || {};
    var filters = req.query.filters || {};

    if (req.query.sSearch) {
        filters.$or = [
            {name: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
            {email: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
            {phone: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
        ];
    }

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

  FormFill.gets(opts).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.get('/:id', function(req, res) {
  FormFill.get(req.params.id).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.get('/export/excel', function (req, res) {
  FormFill.gets({}).then(function (result) {

    try {
      res.xls('form.xlsx', result.data, {fields: ['name', 'email', 'phone', 'comment']});
    } catch (e) {
      res.send({error: e, data: false});
    }

  }).catch(function (err) {
    res.send({error: err.message, data: false});
  });
})

router.put('/', function (req, res) {
    FormFill.add(req.body.args).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});
router.post('/reviewed/:id', function (req, res) {
    FormFill.edit(req.params.id, req.body).then(function (result) {
      res.send({error: null, data: result})
    }).catch(function (err) {
      res.send({error: err.message, data: false});
    });
  });
router.post('/', function (req, res) {
    FormFill.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.delete('/:id', function (req, res) {
    FormFill.delete(req.params.id).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

module.exports = router;
