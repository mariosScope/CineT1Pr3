/*
Developed by:
 __.   ._ ,  __. ,          
(__  _ |,-+-(__ -+- _ .    ,
.__)(_)|  | .__) | (/, \/\/ 

*/     
var app = angular.module('CineLoginApp', [])

app.controller('LoginController', ['$scope', '$location', function($scope, $location) {
  $scope.validateForm = function() {
    if (!angular.isUndefined($scope.email.text) && $scope.password.text.length > 0) {
      window.location.href = "cartelera.html";
    }
  };
}]);
