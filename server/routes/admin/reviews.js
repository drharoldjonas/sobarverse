var express = require('express'),
    router = express.Router(),
    mongojs = require("mongojs");
var Review = require("../../libs/review");

router.get('/', function (req, res) {
    var opts = req.query || {};
    var filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    Review.gets(opts).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.get('/:id', function(req, res) {
    Review.get(req.params.id).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
})

router.post('/approve', function (req, res) {
    Review.edit(req.body.id, {status: 'approved'}).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.post('/', function (req, res) {
    req.body.args.user_id = mongojs.ObjectId(req.body.args.user_id);
    req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
    req.body.args.rating.avg = (Number(req.body.args.rating.overall) + Number(req.body.args.rating.treatment)
        + Number(req.body.args.rating.accommodation) + Number(req.body.args.rating.staff) + Number(req.body.args.rating.value)
        + Number(req.body.args.rating.food)) / 6

    req.body.args.rating.avg = Math.round(req.body.args.rating.avg * 10) / 10;

    Review.add(req.body.args).then(function (result) {
        res.send(result)
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.put('/', function (req, res) {
    req.body.args.user_id = mongojs.ObjectId(req.body.args.user_id);
    req.body.args.facility_id = mongojs.ObjectId(req.body.args.facility_id);
    req.body.args.rating.avg = (Number(req.body.args.rating.overall) + Number(req.body.args.rating.treatment)
        + Number(req.body.args.rating.accommodation) + Number(req.body.args.rating.staff) + Number(req.body.args.rating.value)
        + Number(req.body.args.rating.food)) / 6

    req.body.args.rating.avg = Math.round(req.body.args.rating.avg * 10) / 10;
    Review.edit(req.body.id, req.body.args).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

router.delete('/:id', function (req, res) {
    Review.delete(req.params.id).then(function (result) {
        res.send({error: null, data: result})
    }).catch(function (err) {
        res.send({error: err.message, data: false});
    });
});

module.exports = router;
