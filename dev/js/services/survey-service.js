var angular = require("angular");
var app = angular.module("SurveySamurai");
app.factory("SurveyService", function($http) {

  var factory = {};

  /*
      GETS a random question
  */
  factory.getQuestion = function() {
    return $http.get("/api/survey");
  };

  /*
      POSTS answer to a survey
  */
  factory.sendResponse = function(data) {
    return $http.post("/api/survey", data)
  };

  /*
      POSTS new survey to the server
  */
  factory.addQuestion = function(data) {
    console.log(JSON.stringify(data));
    return $http.post("/api/survey/create", data);
  };

  /*
      GETS data about all survey.
      (should probably paginate this information case it got long, but for a
      demo is shouldn't be too bad)
  */
  factory.getData = function() {
    return $http.get("/api/survey/data");
  }

  /*
      DELETES survey
  */
  factory.deleteSurvey = function(id) {
    return $http.delete("/api/survey/" + id);
  };

  return factory;
});
