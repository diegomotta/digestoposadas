angular.module('digestoPosadas')
  .controller('branchController', [ '$scope','localStorageService','$state','$stateParams','digesto','$filter',function ($scope,localStorageService,$state,$stateParams,digesto, $filter) {
        $scope.getBranches = function(){
          digesto.getBranches().success(function(response){
             $scope.branches = response;
          });
        }
        $scope.branches = $scope.getBranches();
        
        $scope.addBranch = function(){
            $state.go('branch_new', {});
          
        }

        $scope.createBranch = function(name,number){
          digesto.createBranch(name,number).success(function(response){
             $state.go('branch_list',{});
          });
        };
// .catch(function(resp) {
//                   $state.go('index');
//           })
        $scope.updateTemplateBranch = function(id){
              $stateParams.branchID = id;
              $state.go('branch_update', {branchID: $stateParams.branchID});
        };

        $scope.showBranch = function(id){
              $stateParams.branchID = id;
              $state.go('branch_show', {branchID: $stateParams.branchID});
        };

        $scope.updateBranch = function(id,name,number){
          digesto.updateBranch(id,name,number).success(function(response){
              $state.go('branch_list', {});
          }).catch(function(resp) {
                  $state.go('index');
          });
        };


        $scope.cancelBranch = function(){
            $state.go('branch',{});
        }

        $scope.deleteBranch = function(id){
          digesto.deleteBranch(id).success(function(response){    
            $scope.getBranches();
          }).catch(function(resp) {
                  $state.go('index');
          });;
        }

        $scope.searchOrdinance = function(idbranch,numberOrdinance, year, word){
          $stateParams.branchID = idbranch;
           $scope.branch = {"name":"","number":"","id":""};
          if(idbranch != "" || idbranch != null){
            digesto.getOrdinances(idbranch).success(function(response){

               $scope.ordinances = response;
               $scope.ordinances= $filter('filter')($scope.ordinances, { number: numberOrdinance });
               if(year != "" || year != null){
                  $scope.ordinances= $filter('filter')($scope.ordinances, year);
                  
               }
               if(word != "" || word != null){
                  $scope.ordinances= $filter('filter')($scope.ordinances, word);
                  
               }
              localStorageService.set("ordinances", $scope.ordinances);
              digesto.getBranch($stateParams.branchID).success(function(response){
                    $scope.branch = response;
                    localStorageService.set("nameBranch",$scope.branch.name);
              });
              $state.go('show_ordinances_main', { },{ reload: true });
            });

          }
        }
       
       $scope.searchOrdinancerulerefunded = function(numberOrdinance){
            digesto.getOrdinances(19).success(function(response){
            $scope.ordinances = response;

            if(numberOrdinance != "" || numberOrdinance != null){
                $scope.ordinances= $filter('filter')($scope.ordinances, { number: numberOrdinance });
                localStorageService.set("ordinances", $scope.ordinances)
                $state.go('show_ordinances_main', {});
            }
          });
        }

       $scope.searchnoconsolidatedstandards = function(){
            digesto.getOrdinances(18).success(function(response){
            $scope.ordinances = response;
            localStorageService.set("ordinances", $scope.ordinances)
            $state.go('show_ordinances_main', {});
         });
      }
          
  }]);

