let Data = require("./data");
let facilityCategories = new Data('facility_categories');

facilityCategories.deleteCat = (id) => {
  return new Promise((resolve, reject) => {
    facilityCategories.delete(id).then((error, result) => {
      resolve({deleted: true})
    }).catch((error) => {
      reject({error: error.message});
    })
  })
}

module.exports = facilityCategories;
