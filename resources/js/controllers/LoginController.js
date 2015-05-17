'use strict';

/**
 * LoginController
 * @constructor
 */

var LoginController = function($scope, $location) {
    $scope.validateForm = function() {

        if (!angular.isUndefined($scope.email.text) && $scope.password.text.length > 0) {
            console.log($scope.email.text + ' | ( ͡° ͜ʖ ͡°) | ' + $scope.password.text);
            window.location.href = "seat.html";
        }

    };
}