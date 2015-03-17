var PromocaoController = function ($scope, $rootScope, $routeParams, Promocao) {
	switch($routeParams.tipo){
		case 'destaques':
			$scope.tipo = 'hot';
			break;
		case 'novos':
			$scope.tipo = 'new';
			break;
		case 'favoritos':
			$scope.tipo = 'favorite';
			break;
		default:
			$scope.tipo = 'hot';
			break;
	}
	
}

angular.module('Hipopocket').controller('PromocaoController', PromocaoController);
