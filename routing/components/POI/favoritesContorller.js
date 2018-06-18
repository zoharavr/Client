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
            setID.forward(id);
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
            if(i<self.allfavs.length-1){
                let aux=self.allfavs[i+1];
                self.allfavs[i+1]=self.allfavs[i];
                self.allfavs[i]=aux;
            }
            else {
                let aux=self.allfavs[0];
                self.allfavs[0]=self.allfavs[i];
                self.allfavs[i]=aux;
            }
        }
        self.moveUp=(i)=>{
            if(i>0){
                let aux=self.allfavs[i-1];
                self.allfavs[i-1]=self.allfavs[i];
                self.allfavs[i]=aux;
            }
            else {
                let n=self.allfavs.length-1
                let aux=self.allfavs[n];
                self.allfavs[n]=self.allfavs[i];
                self.allfavs[i]=aux;
            }
        }
    }]);