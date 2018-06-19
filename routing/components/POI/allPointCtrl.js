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
            //writes all changes in the local storage into the server
            self.writeChanges = function () {
                var local = localStorageService.get("favorites");
                var server = $rootScope.serverData;
                deleteAllFromServer(server);
                writeLocalToServer(local);
                $rootScope.serverData = local;
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

            function deleteAllFromServer(server) {
                for (var x = 0; x < server.length; x++) {
                    $http.delete(serverUrl + "Users/removeInterestPoint/" + server[x].ID)
                        .then((response) => {
                            console.log(response);
                        }
                        ), (response) => {
                            console.log(response);
                        }
                }
            }
            function writeLocalToServer(local) {
                for (var x = 0; x < local.length; x++) {
                    myObj = {
                        "ID": local[x].ID
                    }
                    $http.post(serverUrl + "Users/saveInterestPoint", myObj)
                        .then(function (response) {
                            console.log(response.data);
                        },
                            function (response) {
                                console.log(response);
                            });
                }
            }
            //open the modal window to comment
            self.show = (id) => {
                $("#commentModal").modal("show");
                self.clicked = id;
            }
        }]);

//in server not in local => need to delete from server
                // var miss = missingPOI(local, server);
                // //in local not in server => need to add to server
                // var added = addedPOI(local, server);
                // for (var i = 0; i < miss.length; i++) {
                //     myObj = {
                //         "ID": miss[i].ID
                //     }
                //     $http.delete(serverUrl + "Users/removeInterestPoint/" + p.ID)
                //         .then((response) => {
                //             console.log(response);
                //         }
                //         ), (response) => {
                //             console.log(response);
                //         }

                // }
                // for (var i = 0; i < added.length; i++) {
                //     myObj = {
                //         "ID": miss[i].ID
                //     }
                //     $http.post(serverUrl + "Users/saveInterestPoint", myObj)
                //         .then(function (response) {
                //             console.log(response.data);
                //         },
                //             function (response) {
                //                 console.log(response);
                //             });
                // }