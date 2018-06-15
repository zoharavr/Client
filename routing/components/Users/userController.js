angular.module('citiesApp').controller('userController', ['$http','localStorageService', '$location','$scope','setHeadersToken', function ($http,localStorageService, $location,$scope,setHeadersToken) {
    self = this;
    let serverUrl = 'http://localhost:8080/';
    //The screen will be splitted for 2 sides.
    //The system will represent the 2 most popular POI (by subject) 
    var token=  localStorageService.get("token");
    console.log(token);
    console.log(localStorageService.keys());
    setHeadersToken.set(token);
    $http.get(serverUrl + "Users/2InterestPoint")
    .then(function (response) {    
        self.LastSaved= response.data;
        console.log(response.data);
    }, function (response) {
        console.log(response.data);
    }); 
    //The system will represent the last two POI, that the user has saved
    $http.get(serverUrl + "Users/Last2Saved")
    .then(function (response) {
        self.LastSaved= response.data;
        console.log(response.data);
    }, function (response) {
        console.log(response.data);
    });
    
    self.logOut= function(){
        localStorageService.remove('token');
        $location.url('/'); 
        console.log('Hello guest');
        $scope.userName = 'Hello guest';
    } 



}]);
