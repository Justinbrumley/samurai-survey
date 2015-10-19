// Module imports
var express = require("express"),
    app = express(),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    models = require("./models");

// Load configuration values
var config = require("./config.js");
var port = config.port;

// Set up express session and express body parser
app.use(session({
  secret: 'SuperSamurai',
  saveUninitialized: true,
  resave: false
}));

app.use(cookieParser("SuperSamuraiCookies"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

// Initialize static file directory.
app.use(express.static(__dirname + "/public"));

// Load the API Router
var apiRouter = require("./apiController.js");
app.use("/api", apiRouter);

// Default Survey Route
app.get("/", home);

// Admin Login Routes
app.get("/admin", adminGet);
app.post("/admin", adminPost);

// Auth middleware. Every route after this requires login.
app.use(authenticate);

// Admin Dashboard
app.get("/admin/dashboard", dashboard);

// Start up the server after syncing sequelize
models.sequelize.sync().then(function() {
  app.listen(port, function(err) {
    if(err)
      console.log(err);
    else
      console.log("Listening on port: " + port);
  });
});

// -----------------------------------
// Route and Middleware Functions
// -----------------------------------
function home(req, res) {
  return res.sendFile(__dirname + "/views/index.html");
}

function adminGet(req, res) {
  return res.sendFile(__dirname + "/views/admin.html");
}

function adminPost(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if(username == config.admin && password == config.password) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    req.session.admin = false;
    res.sendFile(__dirname + "/views/admin.html");
  }
}

function authenticate(req, res, next) {
  if(req.session) {
    if(!req.session.admin) {
      return res.redirect("/admin");
    }
  } else {
    return res.redirect("/admin");
  }
  next();
}

function dashboard(req, res) {
  return res.sendFile(__dirname + "/views/dashboard.html");
}
