angular.module("Hipopocket", ['ngRoute', 'ngResource'])

.config(
    function($routeProvider, $locationProvider) {
        
        $routeProvider
        .when('/:tipo', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        })  
        .when('/app/publique', {
            templateUrl: 'views/publique.html',
            controller: 'PubliqueController'
        })
        .otherwise({
          redirectTo: function () {
            return "/destaques";
          }
        })
    }
)

.run(function($rootScope, $location) {
  
  $rootScope.baseUrl = function(){
    // Url base do servidor rest
    return 'http://localhost:3000/api/v1';
  }
  
})