var mainApp = angular.module("citiesApp");
mainApp.controller('favCtrl', ['commentSrvc', '$http', 'setID', 'localStorageService', '$location','$rootScope',
    function (commentSrvc, $http, setID, localStorageService, $location, $rootScope) {
        let serverUrl = 'http://localhost:8080/';
        self = this;
        self.categories = ["", "Sights & Landmraks", "Outdoor Activities ", "Museums", "Shopping", "Nightlife"];
        self.order = ["", "Ratings", "PointName"];
        //get all the user's favorite list 
        self.allfavs = localStorageService.get("favorites");
        var token=  localStorageService.get("token");
        if (token == null){
            $location.url("/");
        }
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
        //writes all changes in the local storage into the server
        self.writeChanges = function () {
            var local = localStorageService.get("favorites");
            var server = $rootScope.serverData;
            let serverUrl = 'http://localhost:8080/';
            if (server === undefined) {
                getFavorites(serverUrl);
            }
            else {
                deleteAllFromServer($rootScope.serverData);
                firstInsert(local);
                writeLocalToServer(local);
                $rootScope.serverData = local;
                alert('your data is saved');
            } 
        }

        function writeLocalToServer(local) {
            myObj={
                Ids:[]
            }
            for(let i =0;i<local.length;i++){
                myObj.Ids.push(local[i].ID);
            }
                $http.post(serverUrl + "Users/saveOrderedFavoriteList", myObj)
                    .then(function (response) {
                        console.log(response.data);
                    },
                        function (response) {
                            console.log(response);
                        });
        }
        function firstInsert(local) {
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
        function getFavorites(serverUrl) {
            $http.get(serverUrl + "Users/Favorites")
                .then(function (response) {
                    //for no repeated calls
                    $rootScope.serverData= response.data;
                    deleteAllFromServer($rootScope.serverData);
                    firstInsert(localStorageService.get('favorites'));
                    writeLocalToServer(localStorageService.get('favorites'));
                    $rootScope.serverData = localStorageService.get('favorites');
                alert('your data is saved');
                }, function (response) {
                    console.log("error");
                });
        }
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
        // make the movement of the rows
        self.moveDown = (i) => {
            if (i < self.allfavs.length - 1) {
                let aux = self.allfavs[i + 1];
                self.allfavs[i + 1] = self.allfavs[i];
                self.allfavs[i] = aux;
                
            }
            else {
                let aux = self.allfavs[0];
                self.allfavs[0] = self.allfavs[i];
                self.allfavs[i] = aux;
            }
            localStorageService.set("favorites",  self.allfavs);
        }
        self.moveUp = (i) => {
            if (i > 0) {
                let aux = self.allfavs[i - 1];
                self.allfavs[i - 1] = self.allfavs[i];
                self.allfavs[i] = aux;
            }
            else {
                let n = self.allfavs.length - 1
                let aux = self.allfavs[n];
                self.allfavs[n] = self.allfavs[i];
                self.allfavs[i] = aux;
            }
            localStorageService.set("favorites",  self.allfavs);
        }
               //open the modal window to comment
               self.show = (id) => {
                $("#text_modal").val("");
                $("#commentModal").modal("show");
                self.clicked = id;
            }
            
            // comment from the page
            self.makeComment = () =>
                commentSrvc.makeComment(self.content, self.selected, self.clicked);
    }]);