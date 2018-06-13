angular.module('citiesApp').controller('userController', ['$http', function ($http) {
    self = this;
    let serverUrl = 'http://localhost:8080/';
    //The screen will be splitted for 2 sides.
    //The system will represent the 2 most popular POI (by subject)  
    $http.get(serverUrl + "Users/2InterestPoint")
    .then(function (response) {
       console.log(response);
    }, function (response) {
        console.log(response);
    }); 
    //The system will represent the last two POI, that the user has saved
    $http.get(serverUrl + "Users/Last2Saved")
    .then(function (response) {
        console.log(response);
    }, function (response) {
        console.log(response);
    }); 



}]);
