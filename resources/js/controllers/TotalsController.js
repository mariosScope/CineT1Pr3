'use strict';


var TotalsController = function ($scope, $http) {
    
    $scope.selectedSeats = 5;
    
    $scope.getTotal = function () {
        var ticketValue = 1500;
        $scope.total = ticketValue * $scope.selectedSeats;
    };
};