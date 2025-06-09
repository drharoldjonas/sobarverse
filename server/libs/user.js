var Data = require("./data");
var Promise = require("promise");
var User = new Data('users');
var mongojs = require("mongojs");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

User.validate = function(apikey){
    //Make the call to find the user and match the apikey
    return this.get(apikey);
}

User.get = function(id, key){
    //Get the user
    this._join = [
      {$lookup:{from:'roles', localField:'role_id', foreignField:'_id', as:'role'}},
      {$unwind:{path:'$role', preserveNullAndEmptyArrays:true}},
      {$lookup:{from:'companies', localField:'company_id', foreignField:'_id', as:'company'}},
      {$unwind:{path:'$company', preserveNullAndEmptyArrays:true}}
    ];

    return this.__proto__.get.apply(this, [id, key]);
}

User.gets = function(opts){
    //Get the users
    opts = opts||{};
    opts.join = [
      {$lookup:{from:'roles', localField:'role_id', foreignField:'_id', as:'role'}},
      {$unwind:{path:'$role', preserveNullAndEmptyArrays:true}},
      {$lookup:{from:'companies', localField:'company_id', foreignField:'_id', as:'company'}},
      {$unwind:{path:'$company', preserveNullAndEmptyArrays:true}}
    ];

    return this.__proto__.gets.apply(this, [opts]);
}

User.validate = function (token, callback) {
    //Make the call to find the user and match the token

    jwt.verify(token, "$G(!(#1", function(err, decoded) {
        if (err)
            return callback(err, null);

        var stages = [
          {$match: {_id: mongojs.ObjectId(decoded.id)}},
          {$lookup:{from:'roles', localField:'role_id', foreignField:'_id', as:'role'}},
          {$unwind:{path:'$role', preserveNullAndEmptyArrays:true}},
          {$lookup:{from:'companies', localField:'company_id', foreignField:'_id', as:'company'}},
          {$unwind:{path:'$company', preserveNullAndEmptyArrays:true}}
        ];

        User.db.aggregate(stages, function(err, result){
            User.db.update({_id: mongojs.ObjectId(decoded.id)}, {$set:{last_login: new Date()}});
            callback(err, result);
        });
    });
};

User.register = function (user, cb) {
    //Register the user
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;

    var callback = function (err, result) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, result);
        }
    };

    User.db.findOne({email: user.email}, function (err, result) {
        if(err) return callback(err, null);
        if(result){
            var idd = result._id;
            var nid = idd.toString(), ctr = 0;
            var parts = {};
            parts['timestamp'] = parseInt(nid.slice(ctr, (ctr += 8)), 16);
            parts['machineID'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);
            parts['processID'] = parseInt(nid.slice(ctr, (ctr += 4)), 16);
            parts['counter'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);

            var id = parts['counter'];
            User.edit(idd,{"id":id});
            return callback(new Error("Email already in use.", null))
        }
        User.db.insert(user, callback)
    });
};

User.check = function(email) {
  return new Promise(function(resolve, reject){
    User.db.findOne({email: email}, function (err, result) {
      if(err) reject(err)

      resolve(result)
    })
  })
};

module.exports = User;
