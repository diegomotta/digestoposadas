//SISTEMA DE CONSULTAS PARA CONOCER LAS RESOLUCIONES DE LA MUNICIPALIDAD DE LA CIUDAD 
//EL SISTEMA PERMITE REALIZAR CONSULTAS DE MANAERA PUBLICA SIN LA NACESIDAD DE UN ACCESO O LOGUIN
//DESARROLLADOR: DIEGO IVAN MOTTA - POSADAS 
angular.module('digestoPosadas', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ipCookie',
  'ng-token-auth',
  'LocalStorageModule',
  'ui.router',
  'ngMessages'

])

//constant('api','http://0.0.0.0:3000/')
//constant('api','https://sistemadeautogestionciudadana.herokuapp.com/')
.constant('api','https://calm-bayou-30689.herokuapp.com.herokuapp.com/')
              // resolve: {
              // auth: ['$auth', function($auth) {

              //   return $auth.validateUser();
              // }]
.config(function($authProvider) {

    // the following shows the default values. values passed to this method
    // will extend the defaults using angular.extend

    $authProvider.configure({
      apiUrl:                  'http://0.0.0.0:3000',
      tokenValidationPath:     '/auth/validate_token',
      signOutUrl:              '/auth/sign_out',
      emailRegistrationPath:   '/auth',
      accountUpdatePath:       '/auth',
      accountDeletePath:       '/auth',
      confirmationSuccessUrl:  window.location.href,
      passwordResetPath:       '/auth/password',
      passwordUpdatePath:      '/auth/password',
      passwordResetSuccessUrl: window.location.href,
      emailSignInPath:         '/auth/sign_in',
      storage:                 'cookies',
      forceValidateToken:      false,
     });
   })
.config(['$stateProvider', '$urlRouterProvider','$routeProvider','$locationProvider',
  function($stateProvider,$urlRouterProvider,$routeProvider,$locationProvider) {

    $urlRouterProvider.when('branch', '/branches');
    $urlRouterProvider.when('sing_in', '/login');
    $urlRouterProvider.when('index', '/index');
    $urlRouterProvider.when('ticket_new', '/ticket');
    $urlRouterProvider.when('ticket_show', '/ticket-show');
    $urlRouterProvider.when('/', '/home');

    //$urlRouterProvider.when('sign_in', '/sign_in');
    var base_dir =  'app/views/';
    $stateProvider
      .state('ticket_show',{
        url: '/ticket-show',
        views:{
          "menu" : {templateUrl: base_dir + 'tickets/menu_ticket.html'},
          "home" : {templateUrl: base_dir + 'tickets/ticket_show.html'},
        }
      })
      .state('ticket_new',{
        url: '/ticket',
        views: {
          "menu" : {templateUrl: base_dir + 'tickets/menu_ticket.html'},
          "home":{templateUrl: base_dir + 'tickets/ticket_new.html',
                      controller : 'branchController'},
        }
      })
      .state('index', {
         url:'/index',
         views : {
           "menu" : {templateUrl: base_dir + 'menu_index.html'},
            "home" : {templateUrl: base_dir + 'show_ordinance/show_ordinance_home.html',
                      controller : 'branchController'},
            "searchgroup@index":{templateUrl: base_dir + 'show_ordinance/searchgroup.html',
                      controller : 'branchController'
            },
         }
       })
      .state('home', {
         url:'/home',
         views : {
            "home" : {templateUrl: base_dir + '/home.html',}
         }
       })
       .state('sing_in',{
          url:'/login',
          views : {
            //"menu" : {templateUrl: base_dir + 'menu.html'},
            "home" : {templateUrl: base_dir + 'user_sessions/new.html',
                   controller: 'UserSessionsCtrl' }
            },
         })
      .state('branch',{
          url: '/branches',
          views : {
            "menu" : {templateUrl: base_dir + 'menu.html'},
            "home" : {templateUrl: base_dir + 'branch/branch_home.html',
                            controller: 'branchController',
            },
            "list_branch@branch":{templateUrl: base_dir + 'branch/branch_list.html',
                            controller: 'branchController',
            }
          },
          resolve: {
                auth: ['$auth', '$state', function($auth,$state) {
                  $auth.validateUser()
                  .catch(function(resp) {
                      $state.go('index');
                  });
                  
                }]
              }
      })
      .state('branch_new',{
          url: '/new',
          parent: 'branch',
          views : {
            "crud_branch@branch":{templateUrl: base_dir + 'branch/branch_new.html',
                            controller: 'branchController',
            }
          },
          resolve: {
                auth: ['$auth', '$state', function($auth,$state) {
                  $auth.validateUser()
                  .catch(function(resp) {
                      $state.go('index');
                  });
                  
                }]
              }
      })      
    .state('branch_update',{
         parent: 'branch',
         url: '/update/{branchID:[0-9]{1,4}}',
             views: {
              "crud_branch@branch": {templateUrl: base_dir+'branch/branch_update.html',
                            controller: ['$scope', '$stateParams', 'digesto',
                            function (  $scope,   $stateParams, digesto) {
                                $scope.branch = {"name":"","number":"","id":""};
                                digesto.getBranch($stateParams.branchID).success(function(response){
                                    $scope.branch.name = response.name;
                                    $scope.branch.id = response.id;
                                    $scope.branch.number = response.number;                                                                    
                                });
                            }],
              }
            },
          resolve: {
                auth: ['$auth', '$state', function($auth,$state) {
                  console.log( $auth.validateUser());
                  $auth.validateUser()
                  .catch(function(resp) {
                      $state.go('index');
                  });
                  
                }]
              }
      })
      .state('branch_list',{
          url: '/branches',
          views : {
            "list_branch@branch":{templateUrl: base_dir + 'branch/branch_list.html',
                            controller: ['$scope', '$stateParams', 'digesto',
                            function (  $scope,   $stateParams, digesto) {
                              digesto.getBranches().success(function(response){
                                 $scope.branches = response;
                              });
                              
                            }],
            }
          },
          resolve: {
            auth: ['$auth', '$state', function($auth,$state) {
              $auth.validateUser()
              .catch(function(resp) {
                  $state.go('index');
              });
              
            }]
          }
      })
      .state('branch_show',{
          parent: 'branch',
          url: '/{branchID:[0-9]{1,4}}',
          views : {
            "list_branch":{templateUrl: base_dir + 'branch/branch_show_home.html'},
            "show_branch@branch_show":{templateUrl: base_dir + 'branch/branch_show.html',
                            controller: 'ordinanceController',
            },
             "list_ordinance@branch_show":{templateUrl: base_dir + 'ordinance/ordinance_list.html',
                            controller: 'ordinanceController',
            }
          },
          resolve: {
            auth: ['$auth', '$state', function($auth,$state) {
              $auth.validateUser()
              .catch(function(resp) {
                  $state.go('index');
              });
              
            }]
          }
      })
    .state('ordinance_new',{
              parent: 'branch_show',
              url: '/ordinance/new',
              views : {
                "crud_ordinance@branch_show":{templateUrl: base_dir + 'ordinance/ordinance_new.html',
                                controller: 'ordinanceController',
                }
              },
              resolve: {
                    auth: ['$auth', '$state', function($auth,$state) {
                      $auth.validateUser()
                      .catch(function(resp) {
                          $state.go('index');
                      });
                      
                    }]
                  }
          })
    .state('ordinance_list',{
              parent: 'branch_show',
              url: '',
              views : {
                "show_branch":{templateUrl: base_dir + 'branch/branch_show.html',
                                controller: 'ordinanceController',
                },
                 "list_ordinance":{templateUrl: base_dir + 'ordinance/ordinance_list.html',
                                controller: 'ordinanceController',
                }
              },
              resolve: {
                    auth: ['$auth', '$state', function($auth,$state) {
                      $auth.validateUser()
                      .catch(function(resp) {
                          $state.go('index');
                      });
                      
                    }]
                  }
          })
    .state('ordinance_update',{
              parent: 'branch_show',
              url: '/ordinance/{ordinanceID:[0-9]{1,4}}',
              views : {
                "crud_ordinance@branch_show":{templateUrl: base_dir + 'ordinance/ordinance_update.html',
                            controller: ['$scope', '$stateParams', 'digesto',  '$filter',
                            function (  $scope,   $stateParams, digesto, $filter) {
                                  $scope.type_ordinancess = [ {"id":1,"name":"Ordenanza Municipal"},];
                                  $scope.type_bulletinss =  [ {"id":1,"name":"Boletín Oficial Municipal"},{"id":2,"name":"Protocolo de Ordenanzas"},{"id":3,"name":"Compilación HCD"}];
                                  $scope.type_promulgationss = [ {"id":1,"name":"Expreso total"},];
                                $scope.ordinance = {"id":"","title":"","type_ordinance":"","branch":"","number":"","previous_number":"","date_sanction":"","type_bulletin":"","number_bulletin":"","date_publication_bulletin":"","page":"","type_promulgation":"","decree_promulgating":"","date_promulgation":"","general_theme":""};
                                digesto.getOrdinance($stateParams.branchID,$stateParams.ordinanceID).success(function(response){
                                    $scope.ordinance.id = response.id;
                                    $scope.ordinance.title = response.title;
                                    $scope.ordinance.type_ordinance = $scope.type_ordinancess[response.type_ordinance -1];
                                    $scope.ordinance.number = response.number;
                                    $scope.ordinance.previous_number = response.previous_number;
                                    $scope.ordinance.date_sanction =  new Date($filter('date')(response.date_sanction, "yyyy-MM-dd"));
                                    $scope.ordinance.type_bulletin = $scope.type_bulletinss[response.type_bulletin -1];
                                    $scope.ordinance.number_bulletin = response.number_bulletin;
                                    $scope.ordinance.date_publication_bulletin = new Date($filter('date')(response.date_publication_bulletin, "yyyy-MM-dd"));
                                    $scope.ordinance.page = response.page;
                                    $scope.ordinance.type_promulgation =  $scope.type_promulgationss[response.type_promulgation-1];
                                    $scope.ordinance.decree_promulgating = response.decree_promulgating;
                                    $scope.ordinance.date_promulgation =  new Date($filter('date')(response.date_promulgation, "yyyy-MM-dd"));

                                    $scope.ordinance.general_theme =  response.general_theme;    
                                    $scope.branch_id = $stateParams.branchID;                                                 
                                });
                            }],
                }
              },
              resolve: {
                auth: ['$auth', '$state', function($auth,$state) {
                  $auth.validateUser()
                  .catch(function(resp) {
                      $state.go('index');
                  });
                  
                }]
              }
          })
    .state('ordinance_show',{
              parent: 'branch_show',
              url: '/ordinance/show/{ordinanceID:[0-9]{1,4}}',
              views : {
                "crud_ordinance@branch_show":{templateUrl: base_dir + 'show_ordinance/form_show_ordinance.html',
                            controller: ['$scope', '$stateParams', 'digesto',  '$filter','localStorageService',
                            function (  $scope,   $stateParams, digesto, $filter,localStorageService) {
                                  $scope.type_ordinancess = [ {"id":1,"name":"Ordenanza Municipal"},];
                                  $scope.type_bulletinss =  [ {"id":1,"name":"Boletín Oficial Municipal"},{"id":2,"name":"Protocolo de Ordenanzas"},{"id":3,"name":"Compilación HCD"}];
                                  $scope.type_promulgationss = [ {"id":1,"name":"Expreso total"},];
                                $scope.ordinance = {"id":"","title":"","type_ordinance":"","branch":"","number":"","previous_number":"","date_sanction":"","type_bulletin":"","number_bulletin":"","date_publication_bulletin":"","page":"","type_promulgation":"","decree_promulgating":"","date_promulgation":"","general_theme":""};
                                $scope.branchName = localStorageService.get("nameBranch");
                                digesto.getOrdinance($stateParams.branchID,$stateParams.ordinanceID).success(function(response){
                                    $scope.ordinance.id = response.id;
                                    $scope.ordinance.title = response.title;
                                    $scope.ordinance.type_ordinance = $scope.type_ordinancess[response.type_ordinance -1];
                                    $scope.ordinance.number = response.number;
                                    $scope.ordinance.previous_number = response.previous_number;
                                    $scope.ordinance.date_sanction =  new Date($filter('date')(response.date_sanction, "yyyy-MM-dd"));
                                    $scope.ordinance.type_bulletin = $scope.type_bulletinss[response.type_bulletin -1];
                                    $scope.ordinance.number_bulletin = response.number_bulletin;
                                    $scope.ordinance.date_publication_bulletin = new Date($filter('date')(response.date_publication_bulletin, "yyyy-MM-dd"));
                                    $scope.ordinance.page = response.page;
                                    $scope.ordinance.type_promulgation =  $scope.type_promulgationss[response.type_promulgation-1];
                                    $scope.ordinance.decree_promulgating = response.decree_promulgating;
                                    $scope.ordinance.date_promulgation =  new Date($filter('date')(response.date_promulgation, "yyyy-MM-dd"));
                                    $scope.ordinance.general_theme =  response.general_theme;                                                 
                                });
                            }],
                }
              },
              resolve: {
                auth: ['$auth', '$state', function($auth,$state) {
                  $auth.validateUser()
                  .catch(function(resp) {
                      $state.go('index');
                  });
                  
                }]
              }
          })
    .state('show_ordinances_main',{
      parent: 'index',
      url: '',
      views:{
            "ordinance_show@index":{templateUrl: base_dir + 'show_ordinance/ordinance_show.html',
                        controller: ['$scope', '$state','$stateParams','localStorageService', 'digesto',  '$filter',
                            function (  $scope,  $state, $stateParams,localStorageService, digesto, $filter) {
                            $scope.ordinances =[];
                             $scope.ordinances = (localStorageService.get("ordinances"));
                             $scope.branchName = localStorageService.get("nameBranch");
                              $scope.showOrdinance = function(ordinance){
                                    localStorageService.set("ordinance", ordinance)
                                    $state.go('show_ordinances_unique', {});
                              }
                           }   
                          ],
            }
          }
        })
    .state('show_ordinances_unique',{
      parent: 'index',
      url: '',
      views:{
      "ordinance_show@index":{templateUrl: base_dir + 'show_ordinance/form_show_ordinance.html',
                controller: ['$scope', 'localStorageService', 'digesto',  '$filter',
                    function (  $scope,   localStorageService, digesto, $filter) {
             
                      $scope.type_ordinancess = [ {"id":1,"name":"Ordenanza Municipal"},];
                      $scope.type_bulletinss =  [ {"id":1,"name":"Boletín Oficial Municipal"},{"id":2,"name":"Protocolo de Ordenanzas"},{"id":3,"name":"Compilación HCD"}];
                      $scope.type_promulgationss = [ {"id":1,"name":"Expreso total"},];

                      $scope.ordinance = {"id":"","title":"","ordinance_type_ordinance":"","branch":"","number":"","previous_number":"","date_sanction":"","ordinance_type_bulletin":"","number_bulletin":"","date_publication_bulletin":"","page":"","ordinance_type_promulgation":"","decree_promulgating":"","date_promulgation":"","general_theme":""};
                      ordinancerecep = (localStorageService.get("ordinance"));
                      $scope.branchName = localStorageService.get("nameBranch");
                      $scope.ordinance.id = ordinancerecep.id;
                      $scope.ordinance.title = ordinancerecep.title;
                      $scope.ordinance.ordinance_type_ordinance = ordinancerecep.type_ordinance;
                      $scope.ordinance.number = ordinancerecep.number;
                      $scope.ordinance.previous_number = ordinancerecep.previous_number;
                      $scope.ordinance.date_sanction =  new Date($filter('date')(ordinancerecep.date_sanction, "yyyy-MM-dd"));

                      $scope.ordinance_type_bulletin = $scope.type_bulletinss[ordinancerecep.type_bulletin -1];
                      $scope.ordinance.number_bulletin = ordinancerecep.number_bulletin;
                      $scope.ordinance.date_publication_bulletin = new Date($filter('date')(ordinancerecep.date_publication_bulletin, "yyyy-MM-dd"));
                      $scope.ordinance.page = ordinancerecep.page;
                      $scope.ordinance.ordinance_type_promulgation = ordinancerecep.type_promulgation;
                      $scope.ordinance.decree_promulgating = ordinancerecep.decree_promulgating;
                      $scope.ordinance.date_promulgation =  new Date($filter('date')(ordinancerecep.date_promulgation, "yyyy-MM-dd"));

                      $scope.ordinance.general_theme =  ordinancerecep.general_theme;  


                   }   
                ],
            }
          }
    })
    $urlRouterProvider.otherwise('/index');
    $locationProvider.html5Mode(true);
}]);




