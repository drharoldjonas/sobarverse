var aws = require('aws-sdk'),
  Promise = require("promise"),
  multer = require('multer'),
  crypto = require('crypto'),
  path = require('path'),
  fs = require('fs');

const BUCKET_NAME = 'sober2019';
const IAM_USER_KEY = process.env.IAM_USER_KEY;
const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    let customFileName = crypto.randomBytes(18).toString('hex'),
      fileExtension = file.originalname.split('.')[1] // get file extension from original file name
    cb(null, customFileName + '.' + fileExtension)
  }
});

var s3 = {};
s3.upload = multer({ storage : storage })

s3.fields = [
  { name: 'image', maxCount: 15 },
  { name: 'logo', maxCount: 1 }
];

s3.bannerField = [
  { name: 'creative', maxCount: 1 }
];

s3.graphFields = [
  { name: 'graph1', maxCount: 1 },
  { name: 'graph2', maxCount: 1 }
];

s3.saveSingle = function(file) {
  let s3bucket = new aws.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
  });

  return new Promise(function(resolve, reject) {
    s3bucket.createBucket(function () {

      var params = {
        Bucket: BUCKET_NAME,
        Key: file.filename,
        Body: fs.createReadStream(file.path),
        ACL: 'public-read'
      };

      s3bucket.upload(params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Location)
        }
      });
    });
  });
};

s3.saveMuliti = function(files) {
  let s3bucket = new aws.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });

  return new Promise(function(resolve, reject) {
    s3bucket.createBucket(function () {
      //Where you want to store your file
      var ResponseData = [];

      files.map((file) => {

        var params = {
          Bucket: BUCKET_NAME,
          Key: file.filename,
          Body: fs.createReadStream(file.path),
          ACL: 'public-read'
        };

        s3bucket.upload(params, function (err, data) {
          if (err) {
            reject(err)
          } else {
            ResponseData.push(data.Location);
            if (ResponseData.length == files.length) {
              resolve(ResponseData)
            }
          }
        });
      });
    });
  });
};

module.exports = s3;
