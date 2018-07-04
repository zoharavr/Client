angular.module('citiesApp')
    .controller('allPointsController', ['commentSrvc', 'setID', '$http', '$location', 'localStorageService', '$scope', '$rootScope',
        function (commentSrvc, setID, $http, $location, localStorageService, $scope, $rootScope) {
            let serverUrl = 'http://localhost:8080/';
            self = this;
            self.userFavorites = localStorageService.get("favorites");
            if (self.userFavorites != null)
                self.favNum = self.userFavorites.length;
            // check if the user is logged in if so show the comment button
            var token = localStorageService.get('token');
            if (token != null) {
                self.flag = true;
            }
            else {
                self.flag = false;
            }

            self.order = ["Views", "Ratings", "PointName"];
            self.categories = ["", "Sights & Landmraks", "Outdoor Activities ", "Museums", "Shopping", "Nightlife"];
            //need to happen imediatlly 
            $http.get(serverUrl + "Points")
                .then(function (response) {
                    self.points = response.data;
                },
                    function (response) {
                        console.log(response);
                    });

            $http.get(serverUrl + "Users/Favorites")
                .then(
                    function (response) {
                        self.favorites = response.data;
                    },
                    function (response) {
                        console.log(response);
                    });

            //redirect to POI page
            self.forward = (id) => {
                setID.forward(id);
                // $location.url("/poi/"+id);
            }

            self.check = function (p) {
                if (self.userFavorites != null) {
                    for (var pid = 0; pid < self.userFavorites.length; pid++) {
                        if (self.userFavorites[pid].ID === p.ID) {
                            p.isChecked = true;
                            return;
                        }
                    }
                    p.isChecked = false;
                }
            }
            //changes the local storage
            //add to favorites when slider is on remove when off    
            self.insertinvited = function (p) {
                myObj = {
                    "ID": p.ID
                }
                if (p.isChecked) {
                    self.favNum++;
                    var local = localStorageService.get("favorites");
                    local.push(p);
                    localStorageService.set("favorites", local);
                }
                else {
                    self.favNum--;
                    var index = POIindex(p);
                    var local = localStorageService.get("favorites");
                    local.splice(index, 1);
                    localStorageService.set("favorites", local);
                }

            }

            function POIindex(p) {
                var local = localStorageService.get("favorites");
                for (var i = 0; i < local.length; i++) {
                    if (local[i].ID === p.ID) {
                        return i;
                    }
                }
            }
            //redirect to user's favorites page
            self.forward_favor = () => {
                $location.url('/favorites');
            }
            // make a comment

            self.makeComment = () =>
                commentSrvc.makeComment(self.content, self.selected, self.clicked);
            //open the modal window to comment
            self.show = (id) => {
                $("#text_modal").val("");
                $("#commentModal").modal("show");
                self.clicked = id;
            }
     
        }]);


          
         