angular.module('citiesApp').controller('passRestoreController', ['$http', function ($http) {
    let serverUrl = 'http://localhost:8080/';
    self = this;
    self.message;
    self.username, self.questions;
    self.answers = {
        Username: "",
        answer1: "",
        answer2: ""
    }
    self.getQuestions = function () {
        $http.get(serverUrl + "retrieve/Questions/" + self.username)
            .then(function (response) {
                if (response.data !== false)
                    self.questions = response.data;
                else {
                    self.message = "Wrong user name";
                    $("#exampleModalCenter").modal("show");
                }
            }, function (response) {
                console.log(response);
            });
    };
    self.sendAnswers = function () {
        self.answers.Username = self.username;
        $http.post(serverUrl + "retrieve/Answers", self.answers)
            .then(function (response) {
                if (response.data !== false)
                    self.password = response.data[0].UserPass;
                else {
                    self.message = "Wrong answers";
                    $("#exampleModalCenter").modal("show");
                }
            }, function (response) {
                console.log(response);
            });
    }

}]);