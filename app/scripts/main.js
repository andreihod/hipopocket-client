angular.module("Hipopocket", ['ngRoute', 'ngResource', 'angularMoment', 'angular-loading-bar'])

.config(
    function($routeProvider, $locationProvider, $httpProvider) {

        $httpProvider.defaults.withCredentials = true;
        
        $routeProvider
        .when('/:tipo', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        }) 
        .when('/:tipo/page/:page', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
        }) 
        .when('/app/publique', {
            templateUrl: 'views/publique.html',
            controller: 'PubliqueController',
            requireLogin: true
        })
        .otherwise({
          redirectTo: function () {
            return "/destaques";
          }
        })
    }
)

.run(function($rootScope, $route, $location, amMoment) {

    amMoment.changeLocale('pt-br');

    $rootScope.userAuthenticated = null;
    $rootScope.userState = 'authenticating'; 

    $rootScope.isLogged = function () {

      if ($rootScope.userState === 'logged') 
        return true;

      // Código em jQuery para abrir janela modal do login
      (function($) {
        $('.hipopocket-login').modal();
      })(jQuery);

      return false;
    }

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        var r = $route.routes[$location.path()];
        
        // Se é necessário login e não está logado, chama método isLogged() e não continua
        if((r && r.requireLogin) && !$rootScope.isLogged())
            event.preventDefault();                
    });


});