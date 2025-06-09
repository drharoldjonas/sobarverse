"use strict";

var app = require("./app.js");
const http = require('http').Server(app);


var server = http.listen(8000, () => {
    console.log('server is running on port', server.address().port);
});

//require("greenlock-express")
  //.init({
    //packageRoot: __dirname,
    //configDir: "./greenlock.d",

    // contact for security and critical bug notices
    //maintainerEmail: "jon@example.com",

    // whether or not to run at cloudscale
    //cluster: false
  //})
  // Serves on 80 and 443
  // Get's SSL certificates magically!
  //.serve(app);
