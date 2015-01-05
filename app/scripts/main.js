angular.module("Hipopocket", ['ngRoute'])

.config(
    function($routeProvider) {
        
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