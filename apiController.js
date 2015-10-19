var express = require("express"),
    router = express.Router(),
    config = require("./config.js"),
    _ = require("underscore"),
    dbHelper = require("./db-helper.js");

// Retrieves a random survey from the database.
router.get("/survey", function(req, res) {
  // Get list of questions the user has already been asked from cookies
  var questions = [];
  if(req.cookies && req.cookies.questions) {
    questions = req.cookies.questions;
  }
});

// Auth middleware. Every route after this requires login.
router.use(function(req, res, next) {
  if(req.session) {
    if(!req.session.admin) {
      return res.redirect("/admin");
    }
  } else {
    return res.redirect("/admin");
  }
  next();
});

// Retrieves data that the dashboard will use to show statistics
router.get("/survey/data", function(req, res) {

});

module.exports = router;
