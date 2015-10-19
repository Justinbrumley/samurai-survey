// Module imports
var express = require("express"),
    app = express(),
    session = require("express-session"),
    bodyParser = require("body-parser");

// Load configuration values
var config = require("./config.js");
var port = config.port;

// Set up express session and express body parser
app.use(session({
  secret: 'SuperSamurai',
  saveUninitialized: true,
  resave: false
}));

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(bodyParser.json());

// Initialize static file directory.
app.use(express.static(__dirname + "/public"));

// Load the API Router
var apiRouter = require("./apiController.js");
app.use("/api", apiRouter);

// Default Survey Route
app.get("/", function(req, res) {
  return res.sendFile(__dirname + "/views/index.html");
});

// Admin Login Routes
app.get("/admin", function(req, res) {
  return res.sendFile(__dirname + "/views/admin.html");
});

app.post("/admin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if(username == config.admin && password == config.password) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    req.session.admin = false;
    res.sendFile(__dirname + "/views/admin.html");
  }
});

// Auth middleware. Every route after this requires login.
app.use(function(req, res, next) {
  if(req.session) {
    if(!req.session.admin) {
      return res.redirect("/admin");
    }
  } else {
    return res.redirect("/admin");
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
