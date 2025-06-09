let Data = require("./data");
let BannerAds = new Data('banner_ads');

// facilityCategories.deleteCat = (id) => {
//   return new Promise((resolve, reject) => {
//     facilityCategories.delete(id).then((error, result) => {
//       resolve({deleted: true})
//     }).catch((error) => {
//       reject({error: error.message});
//     })
//   })
// }

module.exports = BannerAds;
