angular.module('citiesApp')
    .controller('indexController', ['$rootScope','setHeadersToken', '$scope', '$routeParams', '$route', '$location', '$http', 'localStorageService', 
    function ($rootScope,setHeadersToken, $scope, $routeParams, $route, $location, $http, localStorageService) {

        self = this;
        //if we have a token, move directely to USERS
        var token = localStorageService.get('token');
        setHeadersToken.set(token);
        //check if there is token in the local storage 
        if (token != null ) {
            //now we need to check with the server if the token is valid 
            let serverUrl = 'http://localhost:8080/';
            $http.get(serverUrl + "Users")
                .then(function (response) {
                    console.log(response)
                    if (response.data.success) {
                        $rootScope.userName = response.data.userName;
                       // $scope.userName=response.data.userName;
                        console.log(response.data.userName);
                        $location.url('/Users');
                    }
                }, function (response) {
                    console.log(response);
                });
        }
        else $rootScope.userName="guest"
        $scope.$watch(function () {
            return ($route.current && $route.current.css) ? $route.current.css : 'home.css';
        },
            function (value) {
                $scope.css = value;
            });

    }]);
