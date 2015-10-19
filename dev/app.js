var angular = require("angular");
var app = angular.module("SurveySamurai", []);
require("./js/survey-service.js");

app.controller("MainController", function(SurveyService) {
    var vm = this;
    var questionId;
    function getQuestion() {
      SurveyService.getQuestion().then(function(response) {
        questionId = response.data.id;
        vm.question = response.data.text;
        vm.answers = response.data.answers;
      });
    }

    vm.submit = function() {
      var data = {};
      data.questionId = questionId;
      data.answerId = vm.answerId;
      SurveyService.sendResponse(data);

      // Clear existing data:
      vm.question = null;
      vm.answers = null;
      questionId = null;

      // Get a new question
      getQuestion();
    }

    // Get initial question
    getQuestion();
});
