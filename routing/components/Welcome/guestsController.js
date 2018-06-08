angular.module('citiesApp').controller('guestsController',['$location',function($location){
    self=this;
    self.changeToRegPage= function(){
        $location.url('/register');
    };
}]);