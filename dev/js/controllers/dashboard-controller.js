var angular = require("angular");
var app = angular.module("SurveySamurai");
app.controller("DashboardController", function(SurveyService) {
    var vm = this;
    vm.filter = "";

    /*
        Fetches survey information from the server.
    */
    function fetchData() {
      SurveyService.getData().then(function(results) {
        vm.data = results.data;
      });
    }

    /*
        Sends request to delete survey to the server
    */
    vm.deleteSurvey = function(id, index) {
      vm.data.splice(index, 1); // First splice from data array
      SurveyService.deleteSurvey(id); // Then update the server
    };

    /*
      Filters data by search term
    */
    vm.filtered = function() {
      if(vm.data) {
        var arr =  vm.data.filter(function(ele) {
          return ele.text.toLowerCase().indexOf(vm.filter.toLowerCase()) >= 0;
        });
        return arr;
      }
    };

    // Get initial data
    fetchData();
});
