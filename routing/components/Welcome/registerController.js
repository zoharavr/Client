var reg=   angular.module('citiesApp');
 reg.controller('registerController', ['$http','$scope', function($http,$scope) {
     self=this;
     self.questions =['What is your favorite color?','What is your favorite animel?'
     ,'What is the name of your elementary school?'];
    self.countries=[];
    self.categories=[ {category: "Sights & Landmraks ", selected: 'NO'},{category: "Outdoor Activities ", selected: 'NO'},
    {category: "Museums ", selected: 'NO'},{category: "Shopping ", selected: 'NO'},{category: "Nightlife ", selected: 'NO'}];
    // self.categories=["Sights & Landmraks" ,"Outdoor Activities ", "Museums" ,"Shopping" ,"Nightlife"];
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
                    "Country":self.Country, 
                    "Categories":[]
                    }     
                    for(let i=0;i<self.categories.length;i++){
                        if(self.categories[i].selected === "YES"){
                            myObj.Categories.push(self.categories[i].category);               
                        }               
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
