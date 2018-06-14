var guest = angular.module('citiesApp');

guest.service('setHeadersToken', ['$http', function ($http) {
    self = this;
    self.token = ""

    self.set = function (t) {
        self.token = t;
        $http.defaults.headers.common['x-access-token'] = t;
        // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
    }
}])


guest.controller('guestsController', ['setID', '$window', '$http', '$location', '$scope', 'localStorageService', 'setHeadersToken',
    function (setID, $window, $http, $location, $scope, localStorageService, setHeadersToken) {
        self = this;
        let serverUrl = 'http://localhost:8080/';
        //get 3 random point to show for the guest
        $http.get(serverUrl + "3RandomPoints")
            .then((response) => {
                self.randompnts = response.data;
                console.log(self.randompnts)
            }, (response) => {
                console.log(response);
            });
        $scope.navigationUrl = function (id) {
            setID.setPointID(id);
            var url = "#/poi";
            //  $location.url("/poi")
            $window.open(url, '_blank'); // in new tab

        };
        //register was clicked 
        var token = localStorageService.get('token');
        if (token != null) {
            $location.url("/Users")
        }
        self.changeToRegPage = function () {
            $location.url('/register');
        };

        self.login = function () {
            //json objects to send
            //register user fields
            //NEED TO ADD CATEGORIES 
            myObj = {
                "Username": self.username,
                "UserPass": self.password,
            }
            //register user

            $http.post(serverUrl + "login", myObj)
                .then(function (response) {
                    localStorageService.set('token', response.data.token);
                    setHeadersToken.set(response.data.token);
                    $location.url("/Users")
                }, function (response) {
                    console.log(response);
                });
        };




    }]);