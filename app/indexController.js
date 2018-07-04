angular.module('citiesApp')
    .controller('indexController', ['$rootScope', 'setHeadersToken', '$scope', '$routeParams', '$route', '$location', '$http', 'localStorageService',
        function ($rootScope, setHeadersToken, $scope, $routeParams, $route, $location, $http, localStorageService) {

            self = this;
            //if we have a token, move directely to USERS
            var token = localStorageService.get('token');
            setHeadersToken.set(token);
            //check if there is token in the local storage 
            if (token != null) {
                $rootScope.in = true;
                //now we need to check with the server if the token is valid 
                let serverUrl = 'http://localhost:8080/';
                $http.get(serverUrl + "Users")
                    .then(function (response) {
                        if (response.data.success) {
                            $rootScope.userName = response.data.userName;
                            $location.url('/Users');
                        }
                        else if(!response.data.success) {
                            localStorageService.remove('token');
                            $location.url('/About');
                            $rootScope.in = false;
                        }
                    }, function (response) {
                        console.log(response);
                    });
            }
            else {
                $rootScope.userName = "guest";
                $rootScope.in = false;
            }
            $scope.$watch(function () {
                return ($route.current && $route.current.css) ? $route.current.css : 'style_index.css';
            },
                function (value) {
                    $scope.css = value;
                });

            self.logOut = function () {
                localStorageService.remove('token');
                localStorageService.remove('favorites');
                $rootScope.in = false;
                $rootScope.userName = "guest";
                $location.url('/');
            }

        }]);
