angular.module('citiesApp')
    .controller('allPointsController', ['setID','$http','$location', function (setID,$http,$location) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
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

        self.forword=(id)=>{
            setID.setPointID(id);
            $location.url("/poi");
        }
        
    }]);