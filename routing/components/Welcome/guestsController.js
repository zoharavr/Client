var guest=angular.module('citiesApp')

guest.service('setHeadersToken',[ '$http', function ($http) {
    self=this;
    self.token = ""

    self.set = function (t) {
        self.token = t;
        $http.defaults.headers.common[ 'x-access-token' ] = t;
        // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
        console.log("set");
    }
}])


guest.controller('guestsController',['$http','$location','$scope','localStorageService','setHeadersToken',function($http,$location,$scope,localStorageService,setHeadersToken){
    self=this;



    //register was clicked 
    self.changeToRegPage= function(){
        $location.url('/register');
    };

    self.signIn = function (){
            //json objects to send
            //register user fields
            //NEED TO ADD CATEGORIES 
            myObj = { 
                "Username":self.username, 
                "UserPass":self.password,
                }     
            //register user
            let serverUrl = 'http://localhost:8080/';
            $http.post(serverUrl + "login", myObj)
                .then(function (response) {
                    localStorageService.set('token',response.data.token)
                    setHeadersToken.set(response.data.token);
                }, function (response) {
                     console.log(response);
                 });   

    }
    self.Forgot = function (){
        console.log('forgot');
    }
}]);