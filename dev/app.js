var angular = require("angular");
var app = angular.module("SurveySamurai", []);
require("./js/survey-service.js");

app.controller("MainController", function(SurveyService) {
    var vm = this;
    SurveyService.getQuestion().then(function(response) {
      vm.question = response.data.text;
      vm.answers = response.data.answers;
    });

    vm.submit = function() {
      console.log("Results submitted");
    }
});
