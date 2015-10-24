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
//router.use(authenticate); // TODO UNCOMMENT Auth middleware
router.post("/survey/create", addQuestion); // Add new survey
router.get("/survey/data", getData); // Get generic dashboard data
router.delete("/survey/:id", deleteSurvey); // Deletes a survey
module.exports = router;

// --------------------------------
// Middleware and Route Functions
// --------------------------------

/*
    Gets a single random question from the db and sends to the user.
*/
function getQuestion(req, res) {
  // Get list of questions the user has already been asked from cookies
  var questions = [];
  if(req.cookies && req.cookies.questions) {
    questions = req.cookies.questions;
  }

  // Request all of the unasked questions from the db.
  dbHelper.getQuestions(questions).then(function(data) {
    if(data) {
      // Get a random survey from the list and send it to user.
      var i = Math.floor(Math.random() * data.length);
      var tuple = data[i];
      return res.json(data[i]);
    }
  });
}

/*
    Adds a response to a survey question to the database.
*/
function postResponse(req, res) {
  var questionId = req.body.questionId,
      answerId = req.body.answerId;

  // Make sure a question id and an answer id was provided.
  if(!questionId || !answerId) {
    res.status(400);
    return res.json({
      message: "No answer provided."
    });
  }

  // Get user cookie
  var questions = req.cookies.questions || [];

  // Check if user has already answered this question
  if(questions.indexOf(questionId) >= 0) {
    res.status(400);
    return res.json({
      message: "User has already answered this survey."
    });
  }

  // Make sure the answer is for the correct question
  dbHelper.verifyAnswer(answerId, questionId).then(function(exists) {
    if(!exists) {
      res.status(400);
      return res.json({
        message: "Invalid: Answer does not go with survey."
      });
    }

    // Update user's cookie with the answered question
    questions.push(questionId);
    res.cookie("questions", questions);

    // Add a vote for the selected answer.
    dbHelper.addVote(answerId).then(function() {
      res.status(200);
      return res.json({
        message: "Response Posted"
      });
    });
  });
}

/*
    Authenticate middleware
*/
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

/*
    Retrieves generic survey data for the dashboard.
*/
function getData(req, res) {
  dbHelper.getData().then(function(data) {
    return res.json(data);
  });
}

/*
    Adds a new question (with answers) to the db.
*/
function addQuestion(req, res) {
  var question = req.body.question;
  var answers = req.body.answers;
  if(!question || !answers || answers.constructor !== Array) {
    return res.json({
      message: "Error adding question."
    });
  }
  dbHelper.addQuestion(question).then(function(object) {
    dbHelper.addAnswers(answers, object.id).then(function() {
      res.status(201);
      res.json({
        message: "Survey added to db!"
      });
    });
  });
}

/*
    Deletes a surver from the db
*/
function deleteSurvey(req, res) {
  var id = req.params.id;
  // First delete all answers tied to the question...
  dbHelper.deleteAnswers(id).then(function() {
    // Then delete the survey once the answers are gone.
    dbHelper.deleteSurvey(id).then(function() {
      return res.json({
        message: "Survey successfully deleted"
      });
    });
  });
}
