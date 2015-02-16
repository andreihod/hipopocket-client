angular.module("Hipopocket")

.directive('voto', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/voto.html',
        scope: {
	        promocao: '=promocao'
	     	},
        controller: 'VotoController'
    };
});