var Request = require('request'),
    Promise = require('promise');

//site-key = 6LcLz8MUAAAAABeIpUF--UAAE4o9LDwcOQsXpu4E
const URL = 'https://www.google.com/recaptcha/api/siteverify';
const SECRET = '6LcLz8MUAAAAADIwgQgkgQa2jlXOeC6GzmyzLa1u';

var captcha = {};


captcha.verify = function(token) {

  var url = `${URL}?secret=${SECRET}&response=${token}`
  return new Promise(function(resolve, reject) {

    Request.post({url: url}, async function(error, response, body){
      if (typeof body === 'string' || body instanceof String){
        try {
          body = JSON.parse(body);
        } catch (E) {
          reject(err)
        }
      }

      if(!body.success && body.score < 0.5) {
        reject(new Error("Could not Verify reCaptcha"))
      }
      resolve(true)
    })
  })
};

module.exports = captcha;

