const utils = {};

// Regex function for search functionality
utils.escapeRegex = (string) => {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Exporting Function
module.exports = utils;
