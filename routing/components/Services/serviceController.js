

angular.module('citiesApp')

   .controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel', function ($location, $http, setHeadersToken,localStorageModel) {


        self = this;

        self.directToPOI = function () {
            $location.path('/poi')
        }

        let serverUrl = 'http://localhost:8080/'

        let user = {
            userName: "Shir",
            password: "abcd",
            isAdmin: true
        }


        self.signUp = function () {
            // register user
            $http.post(serverUrl + "Users/", user)
                .then(function (response) {
                    //First function handles success
                    self.signUp.content = response.data;
                }, function (response) {
                    //Second function handles error
                    self.signUp.content = "Something went wrong";
                });
        }

        self.login = function () {
            // register user
            $http.post(serverUrl + "Users/login", user)
                .then(function (response) {
                    //First function handles success
                    self.login.content = response.data.token;
                    setHeadersToken.set(self.login.content)


                }, function (response) {
                    //Second function handles error
                    self.login.content = "Something went wrong";
                });
        }

        self.reg = function () {
            // register user
            $http.post(serverUrl + "reg/", user)
                .then(function (response) {
                    //First function handles success
                    self.reg.content = response.data;

                }, function (response) {
                    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

        self.addTokenToLocalStorage = function () {
            localStorageModel.addLocalStorage('token', self.login.content)
        }



    }]);


