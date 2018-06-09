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
      
            self.reg = function () {
                //json objects to send
                //register user fields
                //NEED TO ADD CATEGORIES 
                myObj = { 
                    "FirstName":self.firstName, 
                    "LastName":self.lastName,
                    "City":self.City,
                    "Username":self.userName ,
                    "UserPass":self.password ,
                    "Email":self.email ,
                    "Questions":self.ver1 ,
                    "Verifiers":self.ans1 ,
                    "Questions":self.ver2, 
                    "Verifiers":self.ans2,
                    "Country":self.Country 
                    }     
                //register user
                $http.post(serverUrl + "register", myObj)
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                         alert("something went wrong");
                     });   
            }
        }]);
