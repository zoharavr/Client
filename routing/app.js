let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider',
function ($locationProvider, $routeProvider) {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl:'components/Welcome/guests.html',
        // controller: 'indexController as inCtrl',
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
           // css:'style_index.css'
        })
        .when('/restore',{
            templateUrl:'components/Welcome/passwordRestore.html',
            controller:'passRestoreController as passRestoreCtrl'
        })
        .when('/AllPoints',{
            templateUrl:'components/POI/AllPoints.html',
            controller: 'allPointsController as allPntsCtrl'
            
        })
        .when('/Users', {
            templateUrl:'components/Users/user.html',
            controller: 'userController as userCtrl'
        })
        .otherwise({ redirectTo: '/' });


}]);





