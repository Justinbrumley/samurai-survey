// Module imports
var express = require("express"),
    app = express();

// Load configuration values
var config = require("./config.js");
var port = config.port;

// Initialize static file directory.
app.use(express.static(__dirname + "/public"));

// Start up the server
app.listen(port, function(err) {
  if(err)
    console.log(err);
  else
    console.log("Listening on port: " + port);
});
