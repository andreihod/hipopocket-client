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
            controller: 'PubliqueController'
        })
        .otherwise({
          redirectTo: function () {
            return "/destaques";
          }
        })
    }
)

.run(function(amMoment) {
    amMoment.changeLocale('pt-br');
});