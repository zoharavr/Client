var mainApp = angular.module("citiesApp");
mainApp.service('commentSrvc', ['$http', function ($http) {
    self = this;
    let serverUrl = 'http://localhost:8080/';
    self.makeComment = (comment, rank, id) => {
        let obj_comment = {
            Comment: comment,
            ID: id
        }
        let obj_rank = {
            Rank: rank,
            ID: id
        }
        $http.post(serverUrl + "Users/Comment", obj_comment)
            .then((response) => {
                $http.get(serverUrl + "last2comments/" + id)
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
        if (obj_rank.Rank !== undefined) {
            $http.post(serverUrl + "Users/Rank", obj_rank)
                .then((response) => {
                    console.log("complited");
                },
                    (response) => {
                        console.log(response);
                    });
        }
    }


}]);