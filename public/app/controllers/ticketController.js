angular.module('digestoPosadas')
  .controller('TicketController',
  ['$scope','localStorageService','$state','$stateParams','digesto',
  function ($scope,localStorageService,$state,$stateParams,digesto, $filter) {
  		$scope.responseticket = {"idTicket":""};
        $scope.consulta = {"name":"","description":"","state":"","response":""};
        $scope.getTickets = function(){
          digesto.getTickets().success(function(response){
             $scope.tickets = response;
          });
        }

        $scope.addTicket = function(name,email,contact,description){
          digesto.createTicket(name,email,contact,description,"state","response").success(function(response){
             $scope.responseticket.idTicket = response.id;
          });
        };

        $scope.getTicket = function(id){
        	digesto.getTicket(id).success(function(response){
        		$scope.consulta.name = response.name;
        		$scope.consulta.state = response.state;
        		$scope.consulta.response = response.response;
        		$scope.consulta.description = response.description;
        	});
        };
  }]);
