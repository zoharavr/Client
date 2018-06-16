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
