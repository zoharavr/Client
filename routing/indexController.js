angular.module('citiesApp')
    .controller('indexController', ['setHeadersToken','$scope', '$routeParams', '$route', '$location',function (setHeadersToken,$scope, $routeParams, $route, $location) {

        self = this;
        self.userName = setHeadersToken.userName;
        $scope.$watch(function()
        {
          return ($route.current && $route.current.css) ? $route.current.css : 'home.css';
        }, 
        function(value) 
        {
          $scope.css = value;
        });
        
    }]);
