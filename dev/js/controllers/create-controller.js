var angular = require("angular");
var app = angular.module("SurveySamurai");
app.controller("CreateController", function(SurveyService) {
    var vm = this;
    vm.question = "";
    vm.answers = new Array(4);
    vm.addingSurvey = false;

    vm.addAnswerBox = function() {
      vm.answers.push("");
    }

    // Creates a new survey and posts it to the server
    vm.addSurvey = function() {
      vm.addingSurvey = true;
      var data = {};

      // Get the question
      data.question = {
        text: vm.question
      };

      // Pull the answers into an appropriate array
      data.answers = [];
      for(var i in vm.answers) {
        if(vm.answers[i] && vm.answers[i] !== "") {
          data.answers.push({
            text: vm.answers[i]
          });
        }
      }

      // Post the new survey through the survey service.
      SurveyService.addQuestion(data).then(function() {
        document.location.href = "/admin/dashboard";
      });
    };
});
