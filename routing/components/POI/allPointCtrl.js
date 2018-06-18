angular.module('citiesApp')
    .controller('allPointsController', ['commentSrvc','setID','$http','$location','localStorageService','$scope', 
    function (commentSrvc,setID,$http,$location,localStorageService,$scope) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
        self.favNum=0;
        // check if the user is logged in if so show the comment button
            var token=localStorageService.get('token');
            if(token != null){
            self.flag=true;
            }
            else {
                self.flag=false;
            }

        self.order=["Views","Ratings","PointName"];
        self.categories=["","Sights & Landmraks" ,"Outdoor Activities ", "Museums" ,"Shopping" ,"Nightlife"];
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
        //redirect to POI page
      
            self.forward=(id)=>{
            setID.forward(id);
           // $location.url("/poi/"+id);
        }

        self.save= function(id){         
      
        }  
        //add to favorites when slider is on remove when off    
        self.insertinvited=function(p){
            myObj = {
                "ID":p.ID
                }
            if(p.isChecked){
                self.favNum++;
                $http.post(serverUrl + "Users/saveInterestPoint",myObj)           
                .then(function (response) {
                    console.log(response.data);
                },
                    function (response) {
                        console.log(response);
                    });
            }
            else {
                self.favNum--;
                $http.delete(serverUrl +"Users/removeInterestPoint/"+p.ID)
                .then((response)=>{}
            ),(response)=>{
                console.log(response);
            }
            }
        }
        //redirect to user's favorites page
        self.forward_favor=()=>{
            $location.url('/favorites');
        }
        self.makeComment=(id)=>
        commentSrvc.makeComment(self.content,self.selected,id);
    }]);

