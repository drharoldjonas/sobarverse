var Events = require("events");
var Emitter = new Events.EventEmitter();

//Register an event listening for logevent
Emitter.on('logevent', function(msg, type, obj){
    //Log the event
    global.exception.log(msg, type||'error', obj)
});

//Catch outbound email event
Emitter.on('email', function(subject, message, to, from){
    global.exception.log(subject, 'email', {message: message, subject: subject, to: to, from: from, date: new Date()});
});

Emitter.on('sendWelcome', function(id){
    var Email = require("./email");

    Email.sendWelcome(id, function (err, messageId) {
        console.log('sendwelcome email', err, messageId);
    });
});

Emitter.on('sendFeaturedApproval', function(id){
  var Email = require("./email");

  Email.sendApproval(id, function (id) {
    console.log('send approval', id);
  });
});

Emitter.on('sendFeaturedDenial', function(id){
  var Email = require("./email");

  Email.sendDenial(id, function (id) {
    console.log('send denial', id);
  });
});

Emitter.on('sendPasswordReset', function(id, password){
  var Email = require("./email");

  Email.sendPasswordReset(id, password, function (id) {
    console.log('send password', id);
  });
});

Emitter.on('sendNewVendorNotification', function(vendor){
  let Email = require("./email");

  Email.sendNewVendorNotification(vendor, function (id) {
    console.log('sent vendor notification', id);
  });
});

Emitter.on('sendClaim', function(id){
  var Email = require("./email");

  Email.claim(id, function (id) {
    console.log('send claim', id);
  });
});

Emitter.on('sendFormFill', function(id){
  var Email = require("./email");

  Email.lightbox(id, function (id) {
    console.log('send form fill', id);
  });
});

Emitter.on('sendContact', function(id, email){
  var Email = require("./email");

  Email.contact(id, email, function (id) {
    console.log('send contact', id);
  });
});

Emitter.on('sendConnect', function(id){
  var Email = require("./email");

  Email.connect(id, function (id) {
    console.log('send connect', id);
  });
});

Emitter.on('sendInquiry', function(id){
  console.warn('mail running');
  var Email = require("./email");

  Email.inquiry(id, function (id) {
    console.log('send inquiry', id);
  });
});

Emitter.on('sendLightbox', function(id){
  var Email = require("./email");

  Email.lightbox(id, function (id) {
    console.log('send lightbox', id);
  });
});

Emitter.on('sendEpic', function(id){
  var Email = require("./email");

  Email.epic(id, function (id) {
    console.log('send epic', id);
  });
});

module.exports = Emitter;
