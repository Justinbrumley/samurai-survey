var angular = require("angular");
var app = angular.module("SurveySamurai");
app.factory("SurveyService", function($http) {

    var getQuestion = function() {
      return $http.get("/api/survey");
    };

    return {
      getQuestion: getQuestion
    };
});
