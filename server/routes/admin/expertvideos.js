var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs"),
    s3 = require("../../libs/s3");

var Expertvideo = require("../../libs/expertvideo");
var util = require("../../utils");

router.get('/', function (req, res) {
    var opts = req.query || {};
    var filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    if(req.query.sSearch) {
        opts.filters.name = {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')};
    }

    Expertvideo.gets(opts).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.post('/', s3.upload.single('file'), async function (req, res) {

    req.body.args = JSON.parse(req.body.args);

    if(req.file) {
      try {
        var video = await s3.saveSingle(req.file);
        req.body.args.src = video;
      } catch (e) {
        return res.send({error: e.message, data: false});
      }
    }

    Expertvideo.add(req.body.args).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.put('/', s3.upload.single('file'), async function (req, res) {

    req.body.args = JSON.parse(req.body.args);

    if(req.file) {
      try {
        var video = await s3.saveSingle(req.file);
        req.body.args.src = video;
      } catch (e) {
        return res.send({error: e.message, data: false});
      }
    }

    Expertvideo.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.put('/visible', function (req, res) {

    Expertvideo.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.delete('/:id', function (req, res) {
    Expertvideo.delete(req.params.id).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

module.exports = router;
