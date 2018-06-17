var mainApp = angular.module("citiesApp");
mainApp.factory('setID', ['localStorageService', function (localStorageService) {
    var factory = { id: "" };

    factory.setPointID = (id) => {
        factory.id = id;
    }
    factory.getPointID = () => {
        return factory.id
    }

    return factory;
}]);
mainApp.controller('poiCtrl', ['$http', 'setID', 'localStorageService', function ($http, setID,localStorageService ) {
    
    
    let serverUrl = 'http://localhost:8080/';
    self = this;
 // check if the user is logged in if so show the comment button
    let token =  localStorageService.get('token');
    var mymap = L.map('mapid').setView([10, 60], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiem9oYXJhdnIiLCJhIjoiY2ppaGc5NDFtMTVzcTN3dXBnMGVieWl0ciJ9.11y3xDJ-X2_qezzQB_uOYQ', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);
 
    if(token != null){
        self.flag=true
    }
    else self.flag-false;
       //get last 2 comments for the point
    $http.get(serverUrl + "last2comments/" + setID.id)
        .then((response) => {
            console.log(response.data);
            self.comments = response.data;
        }, (response) => {
            console.log(response);
        })

    // console.log(setID.getPointID());
    $http.get(serverUrl + "interestPoint/" + setID.id)
        .then((response) => {
            self.point = response.data[0];
            console.log(response.data);
        }, (response) => {
            console.log(response);
        });

  

        //user can make a comment about specific poi only once
    self.make_comment = function () {
        let comment = {
            Comment: self.content,
            ID: setID.id
        }
        let rank = {
            Rank: self.selected,
            ID: setID.id
        }
        $http.post(serverUrl + "Users/Comment", comment)
            .then((response) => {
                $http.get(serverUrl + "last2comments/" + setID.id)
                .then((response) => {
                    console.log(response.data);
                    self.comments = response.data;
                }, (response) => {
                    console.log(response);
                })
            },
                (response) => {
                    console.log(response);
                });
        if (rank.Rank !== undefined) {
            $http.post(serverUrl + "Users/Rank", rank)
                .then((response) => {
                    console.log("complited");
                },
                    (response) => {
                        console.log(response);
                    });
        }
   
    }
}]);
