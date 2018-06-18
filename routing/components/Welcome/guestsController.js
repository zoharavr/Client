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


guest.controller('guestsController', ['$rootScope','setID', '$window', '$http', '$location', '$scope', 'localStorageService', 'setHeadersToken',
    function ($rootScope,setID, $window, $http, $location, $scope, localStorageService, setHeadersToken) {
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
        // move to POI page
        $scope.navigationUrl = function (id) {
            setID.forward(id);
        };
       //if we've got token te user shuld see his prsonal page
        var token = localStorageService.get('token');
        if (token != null) {
            $location.url("/Users")
        }
         //register was clicked 
        self.changeToRegPage = function () {
            $location.url('/register');
        };
        self.login = function () {
            //json objects to send
            //NEED TO ADD CATEGORIES 
            myObj = {
                "Username": self.username,
                "UserPass": self.password,
            }
            $http.post(serverUrl + "login", myObj)
                .then(function (response) {
                    if (response.data.success){
                        localStorageService.set('token', response.data.token);
                        setHeadersToken.set(response.data.token);
                        $rootScope.userName=response.data.Username;
                        $rootScope.in=true;
                        console.log( response.data.Username);
                        $location.url("/Users")
                    }
                    else {
                        $("#exampleModalCenter").modal('show');
                    }
                   
                }, function (response) {
                    console.log(response);
                });
        };
    }]);