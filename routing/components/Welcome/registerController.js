var reg=   angular.module('citiesApp');
 reg.controller('registerController', ['$scope','$http', function($scope,$http) {
   $scope.data = {
    model: null,
    availableOptions: [
      {id: '1', name: 'What is your favorite color'},
      {id: '2', name: 'Where are you from?'},
      {id: '3', name: 'Who is your best friend?'}
    ]
   };

let serverUrl = 'http://localhost:8080/'
        // register user
        $http.get(serverUrl + "countries")
            .then(function (response) {
                countries=response.data;
                for (var x=0; x<countries.length; x++) {
                    var str=countries[x]['Name']['0']; 
                    countries[x]=str;
                }
                //console.log(countries);
                $scope.countries= response.data;
            }, function (response) {
                //Second function handles error
                console.log("error");
            });
        }]);
