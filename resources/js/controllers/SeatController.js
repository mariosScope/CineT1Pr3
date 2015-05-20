'use strict';

/**
 * SeatController
 * @constructor
 */
var SeatController = function($scope,$http) {

  var totalSeats = 20;
  $scope.selectedSeats = 0;
  $scope.total = 0;
  $scope.myTickets = [];
  var countBlock = 3;
  var cantPreferentialsSeats = 4;

  $scope.columns = [];
  for (var block = 0; block < countBlock; block++) {
    var array = [];
    for (var i=1; i <= totalSeats; i++) {
      var isPreferenceSeat = false;
      if (i <= cantPreferentialsSeats) { 
        isPreferenceSeat = true;
      }
      array.push({seatNumber:i, blockNumber:block, selected:false, isPreference: isPreferenceSeat});
     }
     $scope.columns.push(array);
  }

  /**
  * Calcula el total a pagar por la cantidad de tiquetes comprados
  */
  $scope.getTotal = function() {
    var ticketValue = 1500;
    $scope.total = ticketValue * $scope.selectedSeats;
  }


  /**
  * Obtiene el nombre de la clase de css que corresponde al tipo de asiento
  */
  $scope.getCssClassNameBySeatType = function(block, seat) {
    if ($scope.isPreferentialSeat(block, seat)) {
      return $scope.getCssClassNameBySeatPreferential();
    } else {
      return $scope.getCssClassNameBySeatNormal();
    }
  }

  /**
  * Obtiene el nombre de la clase de css que corresponde al tipo de asiento preferencial
  */  
  $scope.getCssClassNameBySeatPreferential = function() {
    return $scope.getCssClassNameBySeat() + " preference";
  }

  /**
  * Obtiene el nombre de la clase de css que corresponde al tipo de asiento normal
  */  
  $scope.getCssClassNameBySeatNormal = function() {
    return $scope.getCssClassNameBySeat() +  " available";
  }

  /**
  * Obtiene el nombre de la clase de css que corresponde al tipo de asiento procesado
  */  
  $scope.getCssClassNameBySeatProcessing = function() {
    return $scope.getCssClassNameBySeat() + " processing-seat";
  }

  /**
  * Obtiene el nombre de la clase de css que utilizan todos los asientos
  */  
  $scope.getCssClassNameBySeat = function() {
    return "seatCharts-seat seatCharts ";
  }

  /**
  * Elimina un elemento de un arreglo 
  */
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };

  /**
  * Procesa el asiento seleccionado, para poder seleccionarlo como
  * comprado o retirar la compra
  */
  $scope.processSeat = function(block, seat) {
    if ($scope.isSeatSelected(block, seat)) {
      $scope.deselectSeat(block, seat);
    } else {
      $scope.selectSeat(block, seat);
    }
  }

  /**
  *Procesa el asiento habilitado y lo marca como ocupado
  */
  $scope.selectSeat = function(block, seat) {
    var seatIdentifier = $scope.getSeatIdentifier(block, seat);
    $(seatIdentifier).removeClass($scope.getSeatAvailableCssClass(block, seat));
    $(seatIdentifier).addClass($scope.getSeatProcessingCssClass(block, seat));
    $scope.seatSeatSelected(block, seat, true);
    $scope.selectedSeats ++;
    $scope.myTickets.push($scope.getSeat(block, seat)); 
    $scope.getTotal();
  }

  /**
  *Procesa el asiento ocupado y lo marca como habilitado
  */
  $scope.deselectSeat = function(block, seat) {
    var seatIdentifier = $scope.getSeatIdentifier(block, seat);
    $(seatIdentifier).removeClass($scope.getSeatProcessingCssClass(block, seat));
    $(seatIdentifier).addClass($scope.getSeatAvailableCssClass(block, seat));
    $scope.seatSeatSelected(block, seat, false);
    $scope.selectedSeats --;
    $scope.removeSeat(block, seat);
    $scope.getTotal();
  }

  /**
  * Obtiene la clase de css que identifica si el asiento es normal o preferencial
  */
  $scope.getSeatAvailableCssClass = function(block, seat){
    if ($scope.isPreferentialSeat(block, seat)) {
      return "preference";
    } else {
      return "available";
    }
  }

  /**
  * Obtiene la clase de css que identifica si el asiento esta siendo procesado
  */
  $scope.getSeatProcessingCssClass = function(block, seat){
    return "processing-seat";
  }

  /**
  * Procesa la lista de tiquetes comprado para determinar el indice del 
  * asiento seleccionado
  */
  $scope.getIndexToRemove = function(block, seat){
    var size = $scope.myTickets.length;
    var found = false;
    var index = 0;
    while (!found && index < size) {
      var seatNumber = $scope.myTickets[index].seatNumber;
      var blockNumber = $scope.myTickets[index].blockNumber;
      if (block == blockNumber && seat == seatNumber) {
        found = true;
      } else {
         index++;
      }
    }
    return index;
  }

  /**
  * Elimina un asiento seleccionado de la coleccion que indica todos los 
  * asiento seleccionados
  */
  $scope.removeSeat = function (block, seat) {
    $scope.myTickets.remove($scope.getIndexToRemove(block, seat));
  }

  /**
  * Obtiene el objecto Seat de la seleccion del usuario
  */
  $scope.getSeat = function(block, seat){
    return $scope.columns[block][$scope.getSeatIndex(seat)];
  }

  /*
  * Determina si el asiento fue seleccionado
  */
  $scope.isSeatSelected = function(block, seat) {
    return $scope.getSeat(block, seat).selected;
  }

  /*
  * Cambia el estado del asiento
  */
  $scope.seatSeatSelected = function(block, seat, condition) {
    $scope.getSeat(block, seat).selected = condition;
  }

  /*
  * Obtiene el numero del bloque al que corresponde el asiento seleccionado
  */
  $scope.getSeatBlockNumber = function(block, seat) {
    return $scope.getSeat(block, seat).blockNumber;
  }

  /*
  * Obtiene el numero del asiento seleccionado
  */
  $scope.getSeatNumber = function(block, seat) {
    return $scope.getSeat(block, seat).seatNumber;
  }

  /**
  * Indica si el asiento es preferencial
  */
  $scope.isPreferentialSeat = function(block, seat) {
    return $scope.getSeat(block, seat).isPreference;
  }

  /*
  * Obtiene el indice del asiento seleccionado
  */
  $scope.getSeatIndex = function(seat) {
    return seat - 1;
  }

  /*
  * Obtiene el identificador del asiento seleccionado
  */
  $scope.getSeatIdentifier = function(block, seat) {
    var blockNumber = $scope.getSeatBlockNumber(block, seat);  
    var seatNumber = $scope.getSeatNumber(block, seat); 
    return "#identifier-block-" + blockNumber + "-seat-" + seatNumber;
  }

  $scope.redirectTotalsPage = function(){
     window.location.href = "totals.html";
  }
}