const express = require('express'),
      router = express.Router(),
      mongojs = require("mongojs");
const Category = require("../../libs/category");
const util = require("../../utils");

router.get('/', function(req, res) {
    let opts = req.query || {};
    let filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    if(req.query.sSearch) {
      opts.filters.name = {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')};
    }

    Category.gets(req.query).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {
    Category.add(req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {
    Category.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
    Category.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
