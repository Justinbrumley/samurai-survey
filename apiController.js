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

  // Request all of the unasked questions from the db.
  dbHelper.getQuestions(questions).then(function(data) {
    if(!data || data.length == 0) {
      res.cookie("questions", null); // TODO REMOVE THIS
      return res.json([]);
    }

    // Get a random question from the list and send it to user.
    // Cookie value is also updated to mark question as "sent" to the user.
    var i = Math.floor(Math.random() * data.length);
    //questions.push(data[i].id); UNCOMMENT THIS
    var tuple = data[i];
    var values = tuple.dataValues;

    tuple.getAnswers().then(function(answers) {
      res.cookie("questions", null); // TODO SET THIS BACK TO QUESTIONS
      values.answers = answers;
      res.json(values);
    });
  });
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
