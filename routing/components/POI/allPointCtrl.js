angular.module('citiesApp')
    .controller('allPointsController', ['$http', function ($http) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
   //need to happen imediatlly 
            $http.get(serverUrl + "Points")
                .then(function (response) {
                    console.log(response.data);
                    self.points = response.data;
                },
                    function (response) {
                        console.log(response);
                    });
        
    }]);