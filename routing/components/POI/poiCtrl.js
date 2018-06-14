var mainApp = angular.module("citiesApp");
mainApp.factory('setID', ['localStorageService', function (localStorageService) {
    var factory = { id: "" };

    factory.setPointID = (id) => {
        localStorageService.set("id", id);
    }
    factory.getPointID = () => {
        factory.id = localStorageService.get("id");
        return factory.id
    }

    return factory;
}]);
mainApp.controller('poiCtrl', ['$http', 'setID', function ($http, setID) {
    let serverUrl = 'http://localhost:8080/';
    self = this;
    console.log(setID.getPointID());
    $http.get(serverUrl + "interestPoint/" + setID.id)
        .then((response) => {
            console.log(response.data);
        }, (response) => {
            console.log(response);
        });
}]);
