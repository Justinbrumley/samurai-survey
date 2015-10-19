var models = require("./models");

module.exports = {

  getQuestions: function(askedQuestions) {
    askedQuestions = askedQuestions.length ? askedQuestions : [0];

    return models.Question.findAll({
      attributes: ["id", "text"],
      where: {
        id: { $notIn: askedQuestions }
      }
    });
  }

};
