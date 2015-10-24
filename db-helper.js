var models = require("./models");

module.exports = {
  getQuestions: getQuestions,
  getQuestion: getQuestion,
  getData: getData,
  addVote: addVote,
  addQuestion: addQuestion,
  addAnswers: addAnswers,
  deleteAnswers: deleteAnswers,
  deleteSurvey: deleteSurvey,
  verifyAnswer: verifyAnswer
};

// --------------------------------
// Module Functions
// --------------------------------

/*
    Retrieves a list of questions that have not been asked yet (by user)
*/
function getQuestions(askedQuestions) {
  askedQuestions = askedQuestions.length ? askedQuestions : [0];

  return models.Question.findAll({
    include: [
      {
        model: models.Answer,
        attributes: ["id", "text"]
      }
    ],
    attributes: ["id", "text"],
    where: {
      id: { $notIn: askedQuestions }
    }
  });
}

/*
    Gets survey information by question id
*/
function getQuestion(id) {
  return models.Question.findOne({
    attributes: ["id", "text"],
    where: {
      id: id
    }
  });
}

/*
    Returns all survey information
*/
function getData() {
  return models.Question.findAll({
    include: [{
        model: models.Answer,
        attributes: ["id", "text", "votes"]
      }
    ],
    attributes: ["id", "text"]
  });
}

/*
    Adds a vote for the passed in answer
*/
function addVote(answerId) {
  return models.Answer.findOne({
    where: {
      id: answerId
    }
  }).then(function(data) {
    var answer = data.dataValues;
    answer.votes++;
    models.Answer.update(answer, {
      where: {
        id: answerId
      }
    });
  });
}

/*
    Adds a new question to the database.
*/
function addQuestion(question) {
  return models.Question.create({
    text: question.text
  });
}

/*
    Adds answers for a specified survey question
*/
function addAnswers(answers, questionId) {
  answers = answers.map(function(ele) {
    // Map the question Id to the answers
    ele.QuestionId = questionId;
    ele.votes = 0;
    if(ele.text) // Filters out blank answers
      return ele;
  });

  return models.Answer.bulkCreate(answers);
}

/*
    Deletes all answers by question id
*/
function deleteAnswers(questionId) {
  return models.Answer.destroy({
    where: {
      QuestionId: questionId
    }
  });
}

/*
    Removes survey and all answers for that survey from db
*/
function deleteSurvey(id) {
  return models.Question.destroy({
    where: {
      id: id
    }
  });
}

/*
    Verifies that an answer is connected to a certain survey
*/
function verifyAnswer(answerId, questionId) {
  return models.Answer.findOne({
    where: {
      id: answerId
    }
  }).then(function(answer) {
    return answer.QuestionId == questionId;
  });
}
