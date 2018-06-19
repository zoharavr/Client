angular.module('citiesApp').controller('userController', ['$rootScope','$http','localStorageService', '$location','$scope','setHeadersToken','setID',
 function ($rootScope,$http,localStorageService, $location,$scope,setHeadersToken,setID) {
    self = this;
    let serverUrl = 'http://localhost:8080/';
    //The screen will be splitted for 2 sides.
    //The system will represent the 2 most popular POI (by subject) 
    var token=  localStorageService.get("token");
    setHeadersToken.set(token);
    $http.get(serverUrl + "Users/2InterestPoint")
    .then(function (response) {    
        self.InterestPoint= response.data;
    }, function (response) {
        console.log(response.data);
    }); 
    //The system will represent the last two POI, that the user has saved
    $http.get(serverUrl + "Users/Last2Saved")
    .then(function (response) {
        self.LastSaved= response.data;
        if( self.LastSaved.length ===0){
            self.message="Looks like you have not saved favorites points"
        }
    }, function (response) {
        console.log(response.data);
    });
    
    self.logOut= function(){
        localStorageService.remove('token');
        $rootScope.userName="guest";
        $location.url('/');
    } 
            // move to POI page
    $scope.navigationUrl = function (id) {
        setID.forward(id);
    };

}]);
