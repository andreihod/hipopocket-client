angular.module("Hipopocket")

.directive('favorito', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/favorito.html',
        scope: {
	        promocao: '=promocao'
	     	},
        controller: 'FavoritoController'
    };
});