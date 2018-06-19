var mainApp = angular.module("citiesApp");
mainApp.service('setID', ['$location', function ($location) {
    self = this;
    self.forward = (id) => {
        $location.url("/poi/" + id);
    }
}]);
mainApp.controller('poiCtrl', ['commentSrvc', '$routeParams', '$http', 'setID', 'localStorageService',
    function (commentSrvc, $routeParams, $http, setID, localStorageService) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
        // check if the user is logged in if so show the comment button
        let token = localStorageService.get('token');
        var param1 = $routeParams.id;
        
        $http.get(serverUrl + "interestPoint/" + param1)
            .then((response) => {
                self.point = response.data[0];
                POIindex(self.point);
            }, (response) => {
                console.log(response);
            });
            function POIindex(p){
                var local = localStorageService.get("favorites");
                self.clicked=false;
                if (local != null){
                    for (var i = 0; i < local.length; i++) {
                        if (local[i].ID ===  p.ID) {
                            self.clicked=true;
                        }
                    }
                }
            }

         
        self.clicked = false;
        // var mymap = L.map('mapid').setView([10, 60], 13);
        // L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiem9oYXJhdnIiLCJhIjoiY2ppaGc5NDFtMTVzcTN3dXBnMGVieWl0ciJ9.11y3xDJ-X2_qezzQB_uOYQ', {
        //   maxZoom: 18,
        //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        //     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        //     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //   id: 'mapbox.streets'
        // }).addTo(mymap);

        if (token != null) {
            self.flag = true
        }
        else self.flag - false;
        //get last 2 comments for the point
        $http.get(serverUrl + "last2comments/" + param1)
            .then((response) => {
                console.log(response.data);
                self.comments = response.data;
            }, (response) => {
                console.log(response);
            })
        self.savetolocal = () => {
            self.clicked = true;
            var local = localStorageService.get("favorites");
            local.push(self.point);
            localStorageService.set("favorites", local);
        }


        //user can make a comment about specific poi only once
        self.make_comment = function () {
            commentSrvc.makeComment(self.content, self.selected, self.clicked);
        }
    }]);
