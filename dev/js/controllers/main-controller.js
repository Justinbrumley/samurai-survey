var angular = require("angular");
var app = angular.module("SurveySamurai");
app.controller("MainController", function(SurveyService) {
    var vm = this;
    var questionId;
    function getQuestion() {
      SurveyService.getQuestion().then(function(response) {
        questionId = response.data.id;
        vm.question = response.data.text;
        vm.answers = response.data.Answers;
      });
    }

    // Submit answer to survey to server.
    vm.submit = function() {
      SurveyService.sendResponse({
        questionId: questionId,
        answerId: vm.answerId
      }).then(function() {
        // Get a new question
        getQuestion();
      });

      // Clear existing data:
      vm.question = null;
      vm.answers = null;
      questionId = null;
    }

    // Get initial question
    getQuestion();
});
