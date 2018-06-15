angular.module('citiesApp')
    .controller('allPointsController', ['setID','$http','$location','localStorageService','$scope', function (setID,$http,$location,localStorageService,$scope) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
        // check if the user is logged in if so show the comment button
            var token=localStorageService.get('token');
            if(token != null){
            self.flag=true;
            }
            else {
                self.flag=false;
            }
        
        self.val = {};
        self.order=["Views","Ratings","PointName"];
        self.categories=["Sights & Landmraks" ,"Outdoor Activities ", "Museums" ,"Shopping" ,"Nightlife"];
   //need to happen imediatlly 
            $http.get(serverUrl + "Points")
                .then(function (response) {
                    console.log(response.data);
                    self.points = response.data;
                },
                    function (response) {
                        console.log(response);
                    });

            $http.get(serverUrl + "Users/Favorites")
                .then(
                        function (response) {
                            console.log(response.data);
                            self.favorites=response.data;
                        },
                        function (response) {
                            console.log(response);
                        });
            self.forword=(id)=>{
            setID.setPointID(id);
            $location.url("/poi");
        }

        self.save= function(id){           
            myObj = {
                "ID":id
                }
            $http.post(serverUrl + "Users/saveInterestPoint",myObj)           
            .then(function (response) {
                console.log(response.data);
            },
                function (response) {
                    console.log(response);
                });
        }      
    }]);

