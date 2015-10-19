var models = require("./models");

module.exports = {
  getQuestions: getQuestions
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
