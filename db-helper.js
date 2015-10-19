var models = require("./models");

module.exports = {

  getQuestions: function(askedQuestions) {
    askedQuestions = askedQuestions.length ? askedQuestions : [0];

    return models.Question.findAll({
      /*where: {
        id: { $notIn: askedQuestions }
      } */
    });
  }

};
