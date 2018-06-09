angular.module('citiesApp').controller('guestsController',['$http','$location','$scope',function($http,$location,$scope){
    self=this;
    self.changeToRegPage= function(){
        $location.url('/register');
    };
    self.signIn = function (){
            //json objects to send
            //register user fields
            //NEED TO ADD CATEGORIES 
            myObj = { 
                "Username":self.email, 
                "UserPass":self.password,
                }     
            //register user
            let serverUrl = 'http://localhost:8080/';
            $http.post(serverUrl + "login", myObj)
                .then(function (response) {
                    console.log(response);
                }, function (response) {
                     console.log(response);
                 });   

    }
    self.Forgot = function (){
        console.log('forgot');
    }
}]);