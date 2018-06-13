angular.module('citiesApp').controller('userController', ['$http', function ($http) {
    let serverUrl = 'http://localhost:8080/';
    self = this;
    self.username, self.questions;
    self.answers = {
        Username: "",
        answer1: "",
        answer2: ""
    }
    self.getQuestions = function () {
        $http.get(serverUrl + "retrieve/Questions/" + self.username)
            .then(function (response) {
                self.questions = response.data;
            }, function (response) {
                console.log(response);
            });
    };
    self.sendAnswers = function () {
        self.answers.Username=self.username;
        $http.post(serverUrl + "retrieve/Answers", self.answers)
            .then(function (response) {
                self.password=response.data[0].UserPass;
            }, function (response) {
                console.log(response);
            });
    }

}]);
