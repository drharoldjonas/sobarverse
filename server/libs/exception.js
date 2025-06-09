var mongojs = require('mongojs');
var Exception = global['db'].collection('exceptions');

Exception.log = function(msg, type, debug){
    //Handles recording exceptions in the platform
    var exception = {
        message: msg,
        type: (type)? type : 'info',
        debug: debug,
        date: new Date()
    }

    this.insert(exception);
}

module.exports = Exception;