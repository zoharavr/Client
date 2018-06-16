let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider',
function ($locationProvider, $routeProvider) {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl:'components/Welcome/guests.html',
        controller: 'guestsController as gesCtrl',
        css:'components/Welcome/style_guests.css'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            css: 'components/About/style_about.css'
        })
        .when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller: 'poiCtrl as poiCtrl',
            css:'components/POI/poi_style.css'
        })
        .when('/service', {
            templateUrl: 'components/Services/service.html',
            controller: 'serviceController as srvCtrl'
        })
        .when('/register', {
            templateUrl: 'components/Welcome/register.html',
            controller: 'registerController as rgsCtrl',
            css:'components/Welcome/style_reg.css'
        })
        .when('/restore',{
            templateUrl:'components/Welcome/passwordRestore.html',
            controller:'passRestoreController as passRestoreCtrl',
            css:'components/Welcome/style_guests.css'
        })
        .when('/AllPoints',{
            templateUrl:'components/POI/AllPoints.html',
            controller: 'allPointsController as allPntsCtrl',
            css: 'components/POI/AllPoints.css'
            
        })
        .when('/Users', {
            templateUrl:'components/Users/user.html',
            controller: 'userController as userCtrl',
            css:'components/Users/user_style.css'
        })
        .otherwise({ redirectTo: '/' });


}]);





