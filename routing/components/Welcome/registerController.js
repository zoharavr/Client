var reg=   angular.module('citiesApp');
 reg.controller('registerController', ['$http','$scope', function($http,$scope) {
     self=this;
     self.questions =['What is your favorite color?','What is your favorite animel?'
     ,'What is the name of your elementary school?'];
    self.countries=[];
let serverUrl = 'http://localhost:8080/'
        // register user
        
        $http.get(serverUrl + "countries")
            .then(function (response) {
               let res=response.data;
                for (var x=0; x<res.length; x++) {
                    var str=res[x]['Name']['0']; 
                    self.countries[x]=str;
                }
                console.log(self.countries);
              //  $scope.countries= response.data;
            }, function (response) {
                //Second function handles error
                console.log("error");
            });
        }]);
