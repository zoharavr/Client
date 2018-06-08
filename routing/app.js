let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        template: " <ul class=\"slideshow\">" +
            "<li></li>" +
            " <li></li>" +
            "<li></li>" +
            " <li></li>" +
            "<li></li>" +
            " </ul>",
            css:'style_index.css'
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
            css: 'components/Welcome/register.css'
        })
        .otherwise({ redirectTo: '/' });


}]);










