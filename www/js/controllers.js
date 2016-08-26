angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope', '$http', '$cordovaBarcodeScanner', '$ionicPlatform', '$ionicModal', '$timeout', function ($scope, $http, $cordovaBarcodeScanner, $ionicPlatform, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  
  
    //URLS DO WEBSERVICE
  var urlRest = "http://mobile-aceite.tcu.gov.br:80/mapa-da-saude/rest/remedios?codBarraEan=";
  var urlRestLimite = "&quantidade=30";
  
  // Inicializando scope.data -- DIOGO
  $scope.data = {};
  
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.fechaDetalhes = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.resposta = resposta;
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.procurar = function (data) {
    var numero = $scope.data.codigo;
    pesquisa(numero);
  };



  $scope.escanear = function () {
    $ionicPlatform.ready(function () {
      $cordovaBarcodeScanner.scan().then(function (barcodeData) {
        pesquisa(barcodeData.text);
      }, function (error) {
        alert(JSON.stringify(error));
      });
    });
  };

  var pesquisa = function (codigoBarras) {

    var url = urlRest + encodeURI(codigoBarras) + urlRestLimite;

    //console.log("Searching for: " + $scope.data.codigo);

    $http.get(url).then(function (resp) {
      $scope.resposta = resp;
      $scope.modal.show();
    });

  }
  
}])





.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
