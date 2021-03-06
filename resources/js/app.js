/*
Developed by:
 __.   ._ ,  __. ,          
(__  _ |,-+-(__ -+- _ .    ,
.__)(_)|  | .__) | (/, \/\/ 

*/     
var app = angular.module('CineApp', ['ngRoute'])

//aqui se definen las rutas de la aplicacion, cada ruta define su controlador.
//para que funcione esto, se debe correr desde el servidor
app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'views/movies.html',
      controller  : 'MoviesViewController'
    })
    .when('/movies', {
      templateUrl : 'views/movies.html',
      controller  : 'MoviesViewController'
    })
    .when('/seat/:titulo/:tanda', {
      templateUrl : 'views/seat.html',
      controller  : 'SeatController'
    })
    .when('/resultados/:titulo/:tanda', {
      templateUrl : 'views/resultados.html',
      controller  : 'ResultsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

app.factory('ResultadosFactory', function(){
    var factory = {};
    factory.asientosList = [];
    
    factory.getPrecioTotal = function(){
        var entrada = 1500;
        return (entrada * factory.getCantidadAsientos());
    };
    factory.postTicket = function(pTicket){
        factory.asientosList.push(pTicket);
    };
    factory.removeTicket = function(pIndex){
        factory.asientosList.remove(pIndex);
    };
    factory.getAsientosList = function(){
        return factory.asientosList;
    };   
    factory.getCantidadAsientos = function(){
        return factory.getAsientosList().length;
    };
    factory.clearAsientosList = function(){
        factory.asientosList = [];
    };
    
    return factory;
    
});

app.factory('AsientosFactory', function () {
  var factory = {}; 
  factory.asientosList = [];

  factory.getAsientosList = function() {
    var countBlock = 3;
    var totalSeats = 20;
    var cantPreferentialsSeats = 4;

    if(factory.asientosList.length == 0) {
      for (var block = 0; block < 3; block++) {
        var array = [];
        for (var i=1 ; i <= totalSeats; i++) {
          var isPreferenceSeat = false;
          if (i <= cantPreferentialsSeats) { 
            isPreferenceSeat = true;
          }
          array.push({seatNumber:i, blockNumber:block, selected:false, isPreference: isPreferenceSeat});
        }
        factory.asientosList.push(array);
      }
    }
    return factory.asientosList;
  };   

  factory.clearAsientosList = function() {
    var size = factory.asientosList.length ;
    factory.asientosList = [];
  };

  return factory;
});

app.factory('MoviesCatalog', function($http) {
  var service = {};

  service.entries = [
        {"id": 14963, "title": "Rapidos y Furiosos 7", "description": "Tras haber detenido al terrorista internacional Owen Shawm, Toretto y su equipo consiguen regresar a los Estados Unidos sin antecedentes. Pero su hermano Ian está dispuesto a hacer lo que sea necesario para vengar la muerte de Owen."},
        {"id": 15013, "title": "Home: No hay lugar como el hogar", "description": "En la película una raza alienígena invade la Tierra y la utiliza como escondite para su mortal enemigo. Cuando uno de estos aliens informa accidentalmente de su paradero a los enemigos, se verá obligado a huir a toda prisa junto con una adolescente. De manera inverosímil, ambos se harán amigos y se embarcarán en una cómica aventura alrededor del mundo para intentar corregir sus errores. Será entonces cuando el héroe alienígena se de cuenta de lo que realmente significa el ser humano"},
        {"id": 15333, "title": "Cobain: Montage Of Heck", "description": "El documental autorizado del malogrado músico Kurt Cobain, desde su primera época en Aberdeen Washington hasta su éxito con la banda grunge Nirvana."},
        {"id": 15392, "title": "Los Vengadores: La era de Ultron", "description": "Cuando Tony Stark intenta reactivar un programa sin uso que tiene como objetivo de mantener la paz, las cosas comienzan a torcerse y los héroes más poderosos de la Tierra, incluyendo a Iron Man, Capitán América, Thor, El Increíble Hulk, Viuda Negra y Ojo de Halcón, se verán ante su prueba definitiva cuando el destino del planeta se ponga en juego. Cuando el villano Ultron emerge, le corresponderá a Los Vengadores detener sus terribles planes, que junto a incómodas alianzas llevarán a una inesperada acción que allanará el camino para una épica y única aventura."},
        {"id": 15529, "title": "Clown: El payaso del mal", "description": "Un padre decide compra un traje de payaso para animar a su hijo en su sexto cumpleaños. Tras la fiesta se da cuenta de que es incapaz de quitárselo y su personalidad comienza a sufrir terroríficos cambios. Él y su familia deberán intentar quitárselo en una carrera contra el tiempo para terminar con la maldición, antes de que se complete la transformación y se convierta en un homicida con zapatos muy grandes."},
        {"id": 15585, "title": "Mad Max: Furia en el camino", "description": "Cuarta entrega de la saga post-apocalíptica que resucita la trilogía que a principios de los ochenta protagonizó Mel Gibson. Ahora es Tom Hardy quien interpreta a Max Rockatansky en una cinta en la que comparte estrellato con Charlize Theron, que da vida a la emperatriz Furiosa."},
        {"id": 15593, "title": "Terremoto: La falla de San Andres", "description": "La falla de San Andrés acaba cediendo ante las temibles fuerzas telúricas y desencadena un terremoto de magnitud 9 en California. El piloto de un helicóptero de búsqueda y rescate (Johnson) y su ex esposa viajan juntos desde Los Ángeles hasta San Francisco para salvar a su única hija. Pero su tortuoso viaje hacia el norte solamente es el comienzo, y cuando piensan que ya ha acabado lo peor todo vuelve a empezar."},
        {"id": 15698, "title": "Maten al mensajero", "description": "Basada en la historia real del periodista estadounidense Gary Webb, que puso en evidencia las conexiones de la CIA con el mundo de la droga, y demostró que los barrios negros del país fueron inundados de crack mediante un narcotráfico destinado a abastecer de dinero y armas a la CIA"}        
  ];


  //la funcion getById utiliza la libreria underscore.js, para trabajos en arreglos
  service.getById = function(id) {

    //encuentra y devuelve la primera entrada que cumpla con la condicion...
    //documentacion: _.find() http://underscorejs.org/#find
    return _.find(service.entries, function(entry){return entry.id == id});
  }

  return service;
});

app.controller('MoviesViewController', ['$scope', 'MoviesCatalog', function($scope, MoviesCatalog) {
  $scope.catalogo = MoviesCatalog.entries;

}]);

app.controller('SeatController', ['$scope', '$routeParams', '$location', 
  'ResultadosFactory', 'AsientosFactory',
    function($scope, $routeParams, $location, ResultadosFactory, AsientosFactory) {
  $scope.tandapelicula = $routeParams.tanda;
  $scope.titulopelicula = $routeParams.titulo; 
  $scope.selectedSeats = 0;
  $scope.total = 0;
  $scope.myTickets = [];
  $scope.columns = AsientosFactory.getAsientosList();

  $scope.regresar = function() {
    AsientosFactory.clearAsientosList();
    ResultadosFactory.clearAsientosList();
    $location.path('/'); 
  }

  $scope.mostrarResultados = function() {
    if (ResultadosFactory.getCantidadAsientos() > 0) {
      var url = "/resultados/" + $scope.titulopelicula  + "/" + $scope.tandapelicula ;
      $location.path(url);
    } else {
      alert("Seleccione al menos un asiento");
    }
  }

  /**
  * Obtiene el nombre de la clase de css que corresponde al tipo de asiento
  */
  $scope.getCssClassNameBySeatType = function(block, seat) {
    if ($scope.getSeat(block, seat).selected){
      return $scope.getCssClassNameBySeatProcessing();
    } else if ($scope.isPreferentialSeat(block, seat)) {
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
    $scope.setSeatSelected(block, seat, true);
    ResultadosFactory.postTicket($scope.getSeat(block, seat));
  }

  /**
  *Procesa el asiento ocupado y lo marca como habilitado
  */
  $scope.deselectSeat = function(block, seat) {
    var seatIdentifier = $scope.getSeatIdentifier(block, seat);
    $(seatIdentifier).removeClass($scope.getSeatProcessingCssClass(block, seat));
    $(seatIdentifier).addClass($scope.getSeatAvailableCssClass(block, seat));
    $scope.setSeatSelected(block, seat, false);
    ResultadosFactory.removeTicket($scope.getIndexToRemove(block, seat));
  }

  /**
  * Obtiene la clase de css que identifica si el asiento es normal o preferencial
  */
  $scope.getSeatAvailableCssClass = function(block, seat) {
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
  $scope.setSeatSelected = function(block, seat, condition) {
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

}]);

app.controller('ResultsController', ['$scope', '$routeParams', '$location', 'ResultadosFactory',function($scope, $routeParams, $location , ResultadosFactory ) {
    $scope.tandapelicula = $routeParams.tanda;
    $scope.titulopelicula = $routeParams.titulo;
    
    $scope.cantidadAsientos = ResultadosFactory.getCantidadAsientos();
    $scope.total = ResultadosFactory.getPrecioTotal();
    
    $scope.tickets = ResultadosFactory.getAsientosList();
    
    $scope.regresar = function() {
      var url = "/seat/" + $scope.titulopelicula  + "/" + $scope.tandapelicula ;
      $location.path(url);
      //  $location.path('/seat/:titulo/:tanda'); //cambia de ruta
    }
}]);


