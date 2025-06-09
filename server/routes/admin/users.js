var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    mongojs = require("mongojs");
 
var util = require("../../utils");
var User = require("../../libs/user");

router.get('/', function(req, res) {
    var opts = req.query || {};
    var filters = req.query.filters || {};

    opts.filters = filters;
    if (req.query.max) opts.max = Number(req.query.max);
    if (req.query.page) opts.page = Number(req.query.page);

    if (req.query.sSearch) {
      opts.filters['$or'] = [
        {firstname: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
        {lastname: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}},
        {email: {$regex: new RegExp(util.escapeRegex(req.query.sSearch), 'gi')}}
      ]
    }

    User.gets(opts).then(function(result){ res.send(result) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.post('/', function(req, res) {

    if(req.body.args.role_id) mongojs.ObjectId(req.body.args.role_id);
    if(req.body.args.company_id) mongojs.ObjectId(req.body.args.company_id);

    var hashedPassword = bcrypt.hashSync(req.body.args.password, 8);
    req.body.args.password = hashedPassword;

    delete req.body.args.confirm_password;

    User.add(req.body.args).then(function(result){ res.send(result)}).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.put('/', function(req, res) {

    if(req.body.args.role_id) mongojs.ObjectId(req.body.args.role_id);
    if(req.body.args.company_id) mongojs.ObjectId(req.body.args.company_id);

    if(req.body.args.password) {
        var hashedPassword = bcrypt.hashSync(req.body.args.password, 8);
        req.body.args.password = hashedPassword;
    }

    delete req.body.args.confirm_password;

    User.edit(req.body.id, req.body.args).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.delete('/:id', function(req, res) {
    User.delete(req.params.id).then(function(result){ res.send({error:null, data: result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

router.get('/check', function(req, res) {
    User.get(req.query.username, "username").then(function(result){ res.send({error: null, data:result}) }).catch(function(err){ res.send({error: err.message, data: false}); });
});

module.exports = router;
