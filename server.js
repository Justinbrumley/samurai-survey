// --------------------------------
// Module imports
// --------------------------------
var express = require("express"),
    app = express(),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    models = require("./models");

// --------------------------------
// Config and Middleware Setup
// --------------------------------
var config = require("./config.js");
var port = config.port || process.env.port || 8080;

// Session Setup
app.use(session({
  secret: 'SuperSamurai',
  saveUninitialized: true,
  resave: false
}));

// Body parser and Cookie Parser Setup
app.use(cookieParser("SuperSamuraiCookies"));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

// Set the view engine
app.set("view engine", "jade");
app.set("views", __dirname + "/views");

// Initialize static file directory.
app.use(express.static(__dirname + "/public"));

// --------------------------------
// Routing Setup
// --------------------------------

// Load the API Router
var apiRouter = require("./apiController.js");
app.use("/api", apiRouter);

app.get("/", home);
app.get("/admin", adminGet);
app.post("/admin", adminPost);
//app.use(authenticate); // TODO UNCOMMENT TO ENABLE AUTH
app.get("/admin/dashboard", dashboard);
app.get("/admin/survey/create", createSurvey);

// --------------------------------
// Server Start
// --------------------------------
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
  return res.render("index");
}

// Route to get login view
function adminGet(req, res) {
  // If the admin is already logged in, redirect to dashboard
  if(req.session.admin == true) {
    return res.redirect("/admin/dashboard");
  } else {
    return res.render("admin");
  }
}

// Route to post admin login information too.
function adminPost(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if(username == config.admin && password == config.password) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    req.session.admin = false;
    res.render("admin");
  }
}

// Admin authentication middleware
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

// Returns the view for the dashboard
function dashboard(req, res) {
  return res.render("dashboard");
}

// Returns the view for creating a new survey
function createSurvey(req, res) {
  return res.render("survey-create");
}
