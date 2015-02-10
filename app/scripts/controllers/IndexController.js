var IndexController = function ($scope, $routeParams) {
	
	$scope.tipo = $routeParams.tipo;

}

angular.module('Hipopocket').controller('IndexController', IndexController);
