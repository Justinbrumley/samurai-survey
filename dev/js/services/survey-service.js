var angular = require("angular");
var app = angular.module("SurveySamurai");
app.factory("SurveyService", function($http) {

    var getQuestion = function() {
      return $http.get("/api/survey");
    };

    var sendResponse = function(data) {
      return $http.post("/api/survey", data)
    };

    var addQuestion = function(data) {
      return $http.post("/api/survey/create", data);
    };

    return {
      getQuestion: getQuestion,
      sendResponse: sendResponse,
      addQuestion: addQuestion
    };
});