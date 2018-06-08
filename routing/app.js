let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl:'components/Welcome/guests.html',
        css:'components/Welcome/style_guests.css'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller: 'aboutController as abtCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller: 'poiCtrl as poiCtrl'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller: 'serviceController as srvCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Welcome/register.html',
            controller: 'registerController as rgsCtrl',
            css:'style_index.css'
        })
        .otherwise({ redirectTo: '/' });


}]);

app.controller('MainCtrl', function($scope, $routeParams, $route, $location) 
{
  $scope.$watch(function()
  {
    return ($route.current && $route.current.css) ? $route.current.css : 'home.css';
  }, 
  function(value) 
  {
    $scope.css = value;
  });
});





