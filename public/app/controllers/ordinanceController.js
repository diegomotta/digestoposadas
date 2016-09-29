angular.module('digestoPosadas')
  .controller('ordinanceController', [ '$scope','$state','digesto','$stateParams','$filter','localStorageService',function ($scope,$state, digesto,$stateParams,$filter,localStorageService) {

        $scope.type_ordinances = [ {"id":1,"name":"Ordenanza Municipal"},];
        $scope.type_bulletins =  [ {"id":1,"name":"Boletín Oficial Municipal"},{"id":2,"name":"Protocolo de Ordenanzas"},{"id":3,"name":"Compilación HCD"}];
        $scope.type_promulgations = [ {"id":1,"name":"Expreso total"},];
        $scope.branch = {"name":"","number":"","id":""};
        if ( typeof($stateParams.branchID) !== "undefined" && $stateParams.branchID !== null ){
            digesto.getBranch($stateParams.branchID).success(function(response){
            $scope.branch.name = response.name;
            $scope.branch.id = response.id;
            $scope.branch.number = response.number;                                                                    
        });  
        }

        $scope.getOrdinances = function(){
          if ( typeof($stateParams.branchID) !== "undefined" && $stateParams.branchID !== null ){
            digesto.getOrdinances($stateParams.branchID).success(function(response){
               $scope.ordinances = response;
          }).catch(function(resp) {
                  $state.go('index');
          });
          }
         
        }
        $scope.ordinances = $scope.getOrdinances();
        
        $scope.addOrdinance = function(id){
            $stateParams.branchID = id;
            $scope.branch = {"name":"","number":"","id":""};
             digesto.getBranch($stateParams.branchID).success(function(response){
                    $scope.branch = response;
                    
              });
            $state.go('ordinance_new', {branchID: $stateParams.branchID});
          
        }

        $scope.createOrdinance= function(title, description, type_ordinance, branch, number, previous_number, date_sanction, type_bulletin, number_bulletin, date_publication_bulletin, page, type_promulgation, decree_promulgating, date_promulgation, general_theme){
          digesto.createOrdinance($stateParams.branchID, title, description, type_ordinance, branch, number, previous_number, ($filter('date')(date_sanction, "dd/MM/yyyy")), type_bulletin, number_bulletin, ($filter('date')(date_publication_bulletin, "dd/MM/yyyy")), page, type_promulgation, decree_promulgating, ($filter('date')(date_promulgation, "dd/MM/yyyy")), general_theme).success(function(response){
             $state.go('ordinance_list',{branchID: $stateParams.branchID});
          }).catch(function(resp) {
                  $state.go('index');
          });
        };

        $scope.updateTemplateOrdinance= function(id){
              $stateParams.ordinanceID = id;
              $state.go('ordinance_update', {ordinanceID: $stateParams.ordinanceID});
        };


        $scope.updateOrdinance = function(id,title, description, type_ordinance, branch, number, previous_number, date_sanction, type_bulletin, number_bulletin, date_publication_bulletin, page, type_promulgation, decree_promulgating, date_promulgation, general_theme){
          digesto.updateOrdinance($stateParams.branchID,id,title, description, type_ordinance, branch, number, previous_number, date_sanction, type_bulletin, number_bulletin, date_publication_bulletin, page, type_promulgation, decree_promulgating, date_promulgation, general_theme).success(function(response){
              $state.go('ordinance_list', {});
          }).catch(function(resp) {
                  $state.go('index');
          });
        };

        $scope.cancelOrdinance = function(id){
            $stateParams.branchID = id;
            $state.go('branch_show',{branchID: $stateParams.branchID});
        }

        $scope.deleteOrdinance = function(id){
          digesto.deleteOrdinance($stateParams.branchID,id).success(function(response){    
            $scope.getOrdinances();
          }).catch(function(resp) {
                  $state.go('index');
          }); 
        }

        $scope.showOrdinance =function(id){
             $scope.branch = {"name":"","number":"","id":""};
             digesto.getBranch($stateParams.branchID).success(function(response){
                    $scope.branch = response;
                    localStorageService.set("nameBranch", $scope.branch.name);
              });
              $stateParams.ordinanceID = id;
              $state.go('ordinance_show', {ordinanceID: $stateParams.ordinanceID});
        }
  }]);

