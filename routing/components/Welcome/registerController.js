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
        if (self.ver1===self.ver2)
            {
                $("#exampleModalCenter").modal('show');
                self.message='please answer two different questions.'
                return;
            }

        myObj = {
            "FirstName": self.firstName,
            "LastName": self.lastName,
            "City": self.City,
            "Username": self.userName,
            "UserPass": self.password,
            "Email": self.email,
            "Country": self.Country,
            "Categories": [], 
            "Questions": [],
            "Verifiers": []
        }
        myObj.Questions.push(self.ver1); 
        myObj.Questions.push(self.ver2); 
        myObj.Verifiers.push(self.ans1);
        myObj.Verifiers.push(self.ans2);
       
        let n=0;
        for (let i = 0; i < self.categories.length; i++) {
            if (self.categories[i].selected === "YES") {
                myObj.Categories.push(self.categories[i].category);
                n ++;
            }
        }
       
        if (bool == false || n<2) {
            $("input.ng-invalid").css({ border: "2px solid red" });
            $("#exampleModalCenter").modal('show');
            self.message='Please fill out all fields marked with red and make sure you picked at least 2 categories.';
            return;
        }
        //json objects to send
        //register user fields
        //NEED TO ADD CATEGORIES
     
    
        // //register user
        $http.post(serverUrl + "register", myObj)

            .then(function (response) {
                if (response.data==="exist") {
                    $("#exampleModalCenter").modal('show');
                    self.message="user name is exist, please try another user name";
                }
                else {
                    $location.url('/');  
                }            
            }, function (response) {
                $("#exampleModalCenter").modal('show');
                self.message="something went wrong";
            });
    }
}]);
