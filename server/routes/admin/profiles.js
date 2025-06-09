var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs");

var Profile = require("../../libs/profile");
var util = require("../../util");

router.get('/', function (req, res) {
    var opts = req.query.opts || {};
    var filters = req.query.filters || {};

    if (req.query.sSearch) {
        filters.$or = [
            {name: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
            {address: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
            {routingnumber: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
        ];
    }

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    Profile.gets(opts).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.put('/', function (req, res) {
    Profile.add(req.body.args).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.post('/', function (req, res) {
    Profile.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.delete('/:id', function (req, res) {
    Profile.delete(req.params.id).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

module.exports = router;
