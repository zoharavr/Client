var mainApp = angular.module("citiesApp");
mainApp.controller('favCtrl', ['$http', 'setID', 'localStorageService', '$location',
    function ($http, setID, localStorageService, $location) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
        self.categories = ["", "Sights & Landmraks", "Outdoor Activities ", "Museums", "Shopping", "Nightlife"];
        self.order = ["", "Ratings", "PointName"];
        //get all the user's favorite list 
        $http.get(serverUrl + 'Users/Favorites')
            .then((response) => {
                self.allfavs = response.data;
            }), (response) => { console.log(response); }

        //redirect to POI page
        self.forward = (id) => {
            setID.setPointID(id);
            $location.url("/poi");
        }
        //remove point from favorite list
        self.insertinvited = function (p) {
            if (!p.isChecked) {
                $http.delete(serverUrl + "Users/removeInterestPoint/" + p.ID)
                    .then((response) => { }
                    ), (response) => {
                        console.log(response);
                    }
            }
        }

        self.moveDown=(i)=>{
            console.log(i);
        }
        self.moveUp=(i)=>{
            
        }
    }]);