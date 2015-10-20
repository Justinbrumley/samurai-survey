var models = require("./models");

module.exports = {
  getQuestions: getQuestions,
  getQuestion: getQuestion,
  addVote: addVote
};

// --------------------------------
// Module Functions
// --------------------------------

// Retrieves a list of questions that have not been asked yet (by user)
function getQuestions(askedQuestions) {
  askedQuestions = askedQuestions.length ? askedQuestions : [0];

  return models.Question.findAll({
    attributes: ["id", "text"],
    where: {
      id: { $notIn: askedQuestions }
    }
  });
}

// Gets survey information by question id
function getQuestion(id) {
  return models.Question.findOne({
    attributes: ["id", "text"],
    where: {
      id: id
    }
  });
}

// Adds a vote for the passed in answer
function addVote(answerId) {
  models.Answer.findOne({
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
