var mongojs = require("mongojs");
var Promise = require("promise");
var utils = require("utils-pkg");
var Data = function(name){
    this.collection = name;
    this.db = global['db'].collection(this.collection);

    //Some nice utility properties
    this.id = null;
    this._join = null;

    return this;
}

Data.prototype._clean = function(args){
    //Responsible for converting all _id fields to mongojs.ObjectId's
    for(var p in args){
        if(p.search("_id") > -1)
            args[p] = (typeof args[p] == "string" && args[p].length == 24)? mongojs.ObjectId(args[p]): args[p];

        if(args[p] && typeof args[p] == "object" && !args[p][0]){
            //This is an object so perform recursive
            args[p] = this._clean(args[p]);
        }

        if(args[p] && typeof args[p] == "object" && args[p][0]){
            //This is an array so perform a recursive
            for(var i=0;i<args[p].length;i++)
                args[p][i] = this._clean(args[p][i]);
        }

        if(p.search("max_clicks") > -1) args[p] = Number(args[p]);
    }

    return args;
}

Data.prototype.add = function(args){
    //Get the list
    if(!args){
        return Promise.reject(new Error("Missing arguments"));
    }

    //Performs fixing of any _id fields
    args = this._clean(args);
    if(args._id)delete args._id;

    //Record the created_ts data for auditing
    args.created_ts = new Date().getTime();

    return new Promise(function(resolve, reject){
        this.db.insert(args, function(err, data) {
            if (err) {
                return reject(err);
            }

            //Check for a save a copy of the last id
            if(data && data._id){
                this.id = mongojs.ObjectId(data._id);
                var nid = this.id.toString(), ctr = 0;
                var parts = {};
                parts['timestamp'] = parseInt(nid.slice(ctr, (ctr += 8)), 16);
                parts['machineID'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);
                parts['processID'] = parseInt(nid.slice(ctr, (ctr += 4)), 16);
                parts['counter'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);

                var id = parts['counter'];
                this.edit(this.id,{"id":id});
            }
            return resolve(data);
        }.bind(this));
    }.bind(this));
}

Data.prototype.edit = function(id, args, key){
    //Update the record
    if(!id){
        return Promise.reject(new Error("Missing id!"));
    }

    if(!args){
        return Promise.reject(new Error("Missing arguments!"));
    }

    //Performs fixing of any _id fields
    args = this._clean(args);

    /*if(args && id){
        this.id = id;
        var nid = this.id.toString(), ctr = 0;
        var parts = {};
        parts['timestamp'] = parseInt(nid.slice(ctr, (ctr += 8)), 16);
        parts['machineID'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);
        parts['processID'] = parseInt(nid.slice(ctr, (ctr += 4)), 16);
        parts['counter'] = parseInt(nid.slice(ctr, (ctr += 6)), 16);
        var tid = parts['counter'];
        args.id = tid;
    }*/
    delete args._id;
    //delete args.id;
    //Record the modified_ts data for auditing
    args.modified_ts = new Date().getTime();

    return new Promise(function(resolve, reject){
        if(key){
            //Handle none primary key updates
            var filters = {};
            filters[key] = id;
            this.db.update(filters, {$set:args}, {multi:true}, function(err, data) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            }.bind(this));
        } else {
            //Handle primary key update only
            this.db.update({_id: mongojs.ObjectId(id)}, {$set:args}, function(err, data) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            }.bind(this));
        }
    }.bind(this));
}

Data.prototype.get = function(id, key){
    //Get the list
    if(!id){
        return Promise.reject(new Error("Missing id!"));
    }

    return new Promise(function(resolve, reject){
        var stages = [];
        if(key){
            //Handle non primary key value
            var filters = {};
            filters[key] = id;
            stages = [{$match:filters}];
        } else {
            stages = [{$match:{_id: mongojs.ObjectId(id)}}];
        }

        //Check for embeded joins in _join
        if(this._join){
            for(var i=0;i<this._join.length;i++)
                stages.push(this._join[i]);

            this._join = null;
        }

        this.db.aggregate(stages, function(err, data) {
            if(err)
                return reject(err);

            return resolve((data.length)? data[0] : false);
        }.bind(this));
    }.bind(this));
}

Data.prototype.gets = function(opts){
    //Get the list
    opts = Object.assign({orderby:{created_ts: -1, modified_ts: -1}}, opts);
    if(opts.max == -1) delete opts.max;
    var stages = [];
    var filters = (opts && opts.filters)? opts.filters : {};

    //Handle filters
    if(opts.filters) {
        //Handle strange values in filters
        for(var k in opts.filters){
            if(typeof opts.filters[k] == "string") {
                try {
                    opts.filters[k] = eval(opts.filters[k]);
                } catch (Exception){
                    opts.filters[k] = opts.filters[k];
                }
            }
            /*if(opts.filters[k].indexOf("$") > -1)
                opts.filters[k] = eval(opts.filters[k]);*/
        }
        stages.push({$match: opts.filters});
    }

    //Handle joins
    if(opts.join){
        for(var i=0;i<opts.join.length;i++)
            stages.push(opts.join[i]);

        //Example join stages
        //{$lookup:{from:'plans', localField:'plan_id', foreignField:'_id', as:'plan'}}
        //{$unwind:{path:'$plan', preserveNullAndEmptyArrays:true}}
    }

    //Handle sorting
    if(opts.orderby) {
        //Fix values
        for(var k in opts.orderby)
            opts.orderby[k] = Number(opts.orderby[k]);

        stages.push({$sort: opts.orderby});
    }

    //Handle pagination
    opts.page = Number(opts.page);
    opts.max = Number(opts.max);
    var skip = (opts.page * opts.max)
    if(opts.page){
        stages.push({$skip: Number(skip)});
    }
    if(opts.max) {
        stages.push({$limit: Number(opts.max || 25)});
    }

    return new Promise(function(resolve, reject){
        this.db.aggregate(stages, function(err, list) {
            if(err)
                return reject(err);

            this.db.count(opts.filters, function(err, count){
                if(err)
                    return reject(err);

                //Clean up some fields
                if(list && list.length) {
                    for (var x = 0; x < list.length; x++) {
                        delete list[x].password;
                    }
                }

                resolve({total: count, data:list});
            }.bind(this));
        }.bind(this));
    }.bind(this))
}

Data.prototype.delete = function(id, key){
    if(!id)
        return Promise.reject(new Error("Missing id"));

    return new Promise(function(resolve, reject){
        var filters = {};
        if(key)
            filters[key] = id;
        else
            filters["_id"] = mongojs.ObjectId(id);

        this.db.remove(filters, function(err, data){
            //Handle the result
            if(err)
                return reject(err);

            return resolve(data);
        })
    }.bind(this));
};

Data.prototype.batchEdit = function(ids, args){
    //Update the records

    if(!args){
        return Promise.reject(new Error("Missing arguments!"));
    }

    return new Promise(function(resolve, reject){
        var bulkop = this.db.initializeUnorderedBulkOp();

        utils.each(ids, function (index, id, next) {
            //Performs fixing of any _id fields
            var id = mongojs.ObjectId(id);
            arg = this._clean(args);

            //Record the modified_ts data for auditing
            args.modified_ts = new Date().getTime();

            bulkop.find({ _id: id }).updateOne({$set: args});

            if (next) next();
        }.bind(this), function () {
            bulkop.execute(function(err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            }.bind(this));
        }.bind(this));
    }.bind(this));
};

module.exports = Data;
