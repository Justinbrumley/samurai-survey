var angular = require("angular");
var app = angular.module("SurveySamurai");
app.controller("DashboardController", function(SurveyService) {
    var vm = this;

    // Fetches survey information from the server.
    function fetchData() {
      SurveyService.getData().then(function(results) {
        vm.data = results.data;
      });
    }

    // Sends request to delete survey to the server
    vm.deleteSurvey = function(id, index) {
      vm.data.splice(index, 1);
      SurveyService.deleteSurvey(id);
    };

    fetchData();
});
