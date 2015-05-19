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
    .when('/movies/:titulo/:tanda', {
      templateUrl : 'views/seat.html',
      controller  : 'SeatController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

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

app.controller('SeatController', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {

  $scope.tandapelicula = $routeParams.tanda;
  $scope.titulopelicula = $routeParams.titulo; //angular.toJson({titulo: $routeParams.titulo });

  $scope.regresar = function() {
    $location.path('/'); //cambia de ruta
  }

}]);

