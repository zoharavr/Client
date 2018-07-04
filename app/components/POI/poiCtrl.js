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
        if (token != null) {
            self.flag = true
        }
        else self.flag - false;
        //get last 2 comments for the point
        $http.get(serverUrl + "last2comments/" + param1)
            .then((response) => {
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
            commentSrvc.makeComment(self.content, self.selected, param1);
        }
    }]);
