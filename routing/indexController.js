angular.module('citiesApp')
    .controller('indexController', ['setHeadersToken','$scope', '$routeParams', '$route', '$location','$http','localStorageService',function (setHeadersToken,$scope, $routeParams, $route, $location,$http,localStorageService) {

        self = this;
        //if we have a token, move directely to USERS
        var token=localStorageService.get('token');
        setHeadersToken.set(token);
        //check if there is token in the local storage 
        if (typeof token !== "undefined"){
        //now we need to check with the server if the token is valid 
        let serverUrl = 'http://localhost:8080/';
        $http.get(serverUrl + "Users")
            .then(function (response) {
                if (response.data.success){
                    $location.url('/Users');
                    $scope.userName=response.data.userName;
                }
            }, function (response) {
                console.log(response);
            });  
        }
        $scope.$watch(function()
        {
          return ($route.current && $route.current.css) ? $route.current.css : 'home.css';
        }, 
        function(value) 
        {
          $scope.css = value;
        });
        
    }]);
