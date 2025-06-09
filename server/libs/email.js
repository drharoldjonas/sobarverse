var nodemailer = require('nodemailer');
var pug = require('pug');
var Email = global['db'].collection('emails');

Email.send = function (to, subject, message, from, callback) {
    // create reusable transporter object using the default SMTP transport

    var opts = {
        host: global.settings.smtp.smtp_host || 'localhost',
        port: Number(global.settings.smtp.smtp_port) || 25,
        requiresAuth: global.settings.smtp.smtp_secure == 'yes' ? true : false // true for 465, false for other ports
    };

    if (global.settings.smtp) {
        opts.auth = {
            user: global.settings.smtp.smtp_user, // email user
            pass: global.settings.smtp.smtp_password  // email password
        };

        //opts.ignoreTLS = true;
        // opts.tls = {
            // do not fail on invalid certs
            // rejectUnauthorized: false,
            // ciphers: 'SSLv3'
        // };
    }

    console.log(opts)

    var transporter = nodemailer.createTransport(opts);

    // setup email data with unicode symbols
    var mailOptions = {
        'from': global.settings.general.email, // sender address
        'to': global.settings.general.email,
        'bcc':'raj@advadigital.com', // list of receivers
        'subject': subject, // Subject line
        // 'text':'hellosdfsdf',
        text: message.replace(/<\/?[^>]+(>|$)/g, ""), // plain text body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            if (callback) callback.call(this, false, error, info);
            return;
        }

        console.log('Message sent: %s', info.messageId);

        if (callback) callback.call(this, info.messageId, error, info);
        global.events.emit('email', mailOptions.subject, mailOptions.html, mailOptions.to, mailOptions.from);
    });
};

Email.sendWelcome = function(id, callback) {
  var User = require('./user');

  User.get(id).then(function (result) {
    var data = {};
    data.general = global.settings.general;
    data.user = result;

    var html = pug.renderFile('server/emails/welcome-email.pug', data);

    Email.send(data.user.email, data.general.company + ' Welcome', html, data.general.email, function (messageId, error) {
      callback(error, messageId);
    })
  }).catch(function(err){
    callback(err, null);
  });
};

Email.sendPasswordReset = function(id, password, callback) {
  var User = require('./user');

  User.get(id).then(function (result) {
    var data = {};
    data.general = global.settings.general;
    data.user = result;
    data.password = password;

    var html = pug.renderFile('server/emails/reset-password.pug', data);

    Email.send(data.user.email, data.general.company + ' Password Reset', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.sendNewVendorNotification = function(vendor, callback) {
  let html = pug.renderFile('server/emails/new-vendor-request.pug', vendor);

  Email.send(global.settings.general.email, `New Vendor Request: ${vendor.name}`, html, global.settings.general.email, function (messageId, error) {
    callback.call(this, error, messageId);
  })
};

Email.sendDenial = function(id, callback) {
    var AdspotRequests = require('./adspot_request');

  AdspotRequests.get(id).then(function (result) {
      var data = {};
      data.general = global.settings.general;
      data.spot = result.spot;
      data.facility = result.facility;
      data.company = result.company;

      var html = pug.renderFile('server/emails/featured-approval.pug', data);

      Email.send(data.company.email, data.general.company + ' Featured Spot Denial', html, data.general.email, function (messageId, error) {
        callback.call(this, error, messageId);
      })
    }).catch(function(err){
      callback.call(this, err, null);
    });
};

Email.sendApproval = function(id, callback) {
  var AdspotRequests = require('./adspot_request');

  AdspotRequests.get(id).then(function (result) {
    var data = {};
    data.general = global.settings.general;
    data.spot = result.spot;
    data.facility = result.facility;
    data.company = result.company;

    var html = pug.renderFile('server/emails/featured-approval.pug', data);

    Email.send(data.company.email, data.general.company + ' Featured Spot Approved', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.claim = function(id, callback) {
  var Facility = require('./facility');

  Facility.get(id).then(function (result) {
    var data = {};
    data.general = global.settings.general;
    data.facility = result.facility;
    data.company = result.company;

    var html = pug.renderFile('server/emails/claim.pug', data);

    Email.send(data.company.email, data.general.company + ' Claimed Facility', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.epic = function(id, callback) {
  var Transaction = require('./transaction');

  Transaction.get(id).then(function (result) {
    var data = result;

    var html = pug.renderFile('server/emails/epic.pug', data);

    Email.send(data.general.yprEmail, data.general.company + ' New Epic Purchase', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.lightbox = function(id, callback) {
  var FormFill = require('./formfill');

  FormFill.get(id).then(function (result) {
    var data = result;
    data.general = global.settings.general;

    var html = pug.renderFile('server/emails/formfill.pug', data);

    Email.send([data.general.email2, data.general.form_fill_email], data.general.company + ' FORM FILL', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.contact = function(id, email, callback) {
  var Contact = require('./contact');

  Contact.get(id).then(function (result) {
    var data = result;
    data.general = global.settings.general;
    console.log("Sending to email: ", email);

    var html = pug.renderFile('server/emails/contact.pug', data);

    Email.send(email, data.general.company + ' CONTACT FORM', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.connect = function(id, callback) {
  var Connect = require('./connect');

  Connect.get(id).then(function (result) {
    var data = result;
    data.general = global.settings.general;

    var html = pug.renderFile('server/emails/connect.pug', data);

    Email.send([data.general.email2, data.general.connect_email], data.general.company + ' CONNECT FORM', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

Email.inquiry = function(id, callback) {
  var Inquiry = require('./inquiry');

  Inquiry.get(id).then(function (result) {
    var data = result;
    data.general = global.settings.general;

    var html = pug.renderFile('server/emails/inquiry.pug', data);

    Email.send([data.general.email2, data.general.inquiry_email], data.general.company + ' INQUIRY', html, data.general.email, function (messageId, error) {
      callback.call(this, error, messageId);
    })
  }).catch(function(err){
    callback.call(this, err, null);
  });
};

module.exports = Email;
