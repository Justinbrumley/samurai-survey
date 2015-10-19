// Module imports
var express = require("express"),
    app = express(),
    session = require("express-session");

// Load configuration values
var config = require("./config.js");
var port = config.port;

// Set up express session
app.use(session({
  secret: 'SuperSamurai',
  saveUninitialized: true,
  resave: false
}));

// Initialize static file directory.
app.use(express.static(__dirname + "/public"));

// Default Survey Route
app.get("/", function(req, res) {
  return res.sendFile(__dirname + "/views/index.html");
});

// Admin Login Route
app.get("/admin", function(req, res) {
  return res.sendFile(__dirname + "/views/admin.html");
});

// Auth middleware. Every route after this requires login.
app.use(function(req, res, next) {
  if(req.session) {
    if(!req.session.admin) {
      res.redirect("/admin");
    }
  } else {
    res.redirect("/admin");
  }
  next();
});

// Admin Dashboard
app.get("/admin/dashboard", function(req, res) {
  return res.sendFile(__dirname + "/views/dashboard.html");
});

// Start up the server
app.listen(port, function(err) {
  if(err)
    console.log(err);
  else
    console.log("Listening on port: " + port);
});
