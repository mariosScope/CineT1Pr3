'use strict';

/**
 * LoginController
 * @constructor
 */

var LoginController = function($scope, $location) {
	$scope.validateForm = function() {
		if (!angular.isUndefined($scope.userForm.email) && $scope.userForm.password.length > 0 ) {
 			console.log($scope.userForm.email + ' | ' + $scope.userForm.password);
            window.location.href = "seat.html";
		}
	};
}