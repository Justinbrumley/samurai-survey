// --------------------------------
// Module imports
// --------------------------------
var express = require("express"),
    router = express.Router(),
    config = require("./config.js"),
    _ = require("underscore"),
    dbHelper = require("./db-helper.js");

// --------------------------------
// Middleware and Route Declarations
// --------------------------------
router.get("/survey", getQuestion); // Get question
router.post("/survey", postResponse); // Post response
router.use(authenticate); // Auth middleware
router.post("/survey/create", addQuestion); // Add new survey
router.get("/survey/data", getData); // Get generic dashboard data
router.get("/survey/:id/data", getDataBySurvey); // Get survey data
module.exports = router;

// --------------------------------
// Middleware and Route Functions
// --------------------------------

// Gets a single random question from the db and sends to the user.
function getQuestion(req, res) {
  // Get list of questions the user has already been asked from cookies
  var questions = [];
  if(req.cookies && req.cookies.questions) {
    questions = req.cookies.questions;
  }

  // Request all of the unasked questions from the db.
  dbHelper.getQuestions(questions).then(function(data) {
    if(!data || data.length == 0) {
      return res.json([]);
    }

    // Get a random question from the list and send it to user.
    var i = Math.floor(Math.random() * data.length);
    var tuple = data[i];
    var values = tuple.dataValues;
    tuple.getAnswers({ attributes: [ "id", "text" ] }).then(function(answers) {
      values.answers = answers;
      res.json(values);
    });
  });
}

// Adds a response to a survey question to the database.
function postResponse(req, res) {
  var questionId = req.body.questionId,
      answerId = req.body.answerId;

  // TODO add verification code to prevent user from answering a survey they
  // already answered, and make sure that the answer matches the survey.

  var questions = req.cookies.questions;
  // questions.push(questionId); TODO Uncomment
  res.cookie("questions", questions);

  dbHelper.addVote(answerId);
}

// Authenticate middleware
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

// Retrieves generic survey data for the dashboard.
function getData(req, res) {

}

// Retreives survey information for a specific survey.
function getDataBySurvey(req, res) {
  var questionId = req.params.id;

  if(questionId) {
    dbHelper.getQuestion(questionId).then(function(question) {
      var answers = question.getAnswers({
        attributes: ["id", "text", "votes"]
      }).then(function(answers) {
        answers = answers.map(function(ele) {
          return ele.dataValues;
        });
        return res.json({
          question: question.dataValues,
          answers: answers
        });
      });
    });
  } else {
    res.json({
      message: "Invalid request"
    });
  }
}

// Adds a new question (with answers) to the db.
function addQuestion(req, res) {

}
