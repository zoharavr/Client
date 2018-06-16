var reg = angular.module('citiesApp');
reg.controller('registerController', ['$http', '$scope', '$location', function ($http, $scope, $location) {
    self = this;
    self.questions = ['What is your favorite color?', 'What is your favorite animel?'
        , 'What is the name of your elementary school?', "What is your favorite food?"];
    self.countries = [];
    self.categories = [{ category: "Sights & Landmraks ", selected: 'NO' }, { category: "Outdoor Activities ", selected: 'NO' },
    { category: "Museums ", selected: 'NO' }, { category: "Shopping ", selected: 'NO' }, { category: "Nightlife ", selected: 'NO' }];
    // self.categories=["Sights & Landmraks" ,"Outdoor Activities ", "Museums" ,"Shopping" ,"Nightlife"];
    let serverUrl = 'http://localhost:8080/'
    // register user

    $http.get(serverUrl + "countries")
        .then(function (response) {
            let res = response.data;
            for (var x = 0; x < res.length; x++) {
                var str = res[x]['Name']['0'];
                self.countries[x] = str;
            }
        }, function (response) {
            //Second function handles error
            console.log("error");
        });
    //register
    self.reg = function (bool) {
        myObj = {
            "FirstName": self.firstName,
            "LastName": self.lastName,
            "City": self.City,
            "Username": self.userName,
            "UserPass": self.password,
            "Email": self.email,
            "Questions": self.ver1,
            "Verifiers": self.ans1,
            "Questions": self.ver2,
            "Verifiers": self.ans2,
            "Country": self.Country,
            "Categories": []
        }
        let n=0;
        for (let i = 0; i < self.categories.length; i++) {
            if (self.categories[i].selected === "YES") {
                myObj.Categories.push(self.categories[i].category);
                n ++;
            }
        }
       
        if (bool == false || n<2) {
            $("input.ng-invalid").css({ border: "2px solid red" });
            alert('Please fill out all fields marked with red and make sure you picked at least 2 categories.');
            return;
        }
        //json objects to send
        //register user fields
        //NEED TO ADD CATEGORIES
     
    
        // //register user
        $http.post(serverUrl + "register", myObj)

            .then(function (response) {
                if (response.data==="exist") {
                    alert("user name is exist, please try another user name");
                }
                else {
                    $location.url('/');  
                }            
            }, function (response) {
                alert("something went wrong");
            });
    }
    // //validation check
    // $scope.handlePatternPassword = (function() {
    //     var regex = /^[A-Za-z0-9!@#$%^&*()_]{4,20}$/;
    //     return {
    //       test: function(value) {
    //         if ($scope.user.isLogged) {
    //           return (value.length > 0) ? regex.test(value) : true;
    //         } else {
    //           return regex.test(value);
    //         }
    //       }
    //     };
    //   })();

}]);
