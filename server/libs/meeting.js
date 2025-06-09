var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Meeting = new Data('meetings');

Meeting.createBatch = function(bulkop) {
  return new Promise(function(resolve, reject){
    bulkop.execute(function(err, result){
      if(err) return reject(err)

      resolve(result)
    });
  })
};

Meeting.loadData = function (){
  return new Promise((resolve) => {
    Meeting.db.count({}, (err, count) => {
      if (err) console.log('Meeting Count: ', err)
      resolve(count)
    })
  })
}

Meeting.slugify = function(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
};

module.exports = Meeting;
