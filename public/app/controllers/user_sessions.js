angular.module('digestoPosadas')
  .controller('UserSessionsCtrl', ['$scope','$state','$rootScope', function ($scope, $state,$rootScope) {
    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = "Ingrese un usuario  autenticado y contraseña correcta";
    });
    $scope.$on('auth:login-success', function() {
   		 $state.go('branch');
 	});
	$rootScope.$on('auth:logout-success', function(ev) {
       $state.go('index');
	});


  }]);