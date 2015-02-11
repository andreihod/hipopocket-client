var IndexController = function ($scope, $routeParams, Promocao) {
	
	$scope.tipo = $routeParams.tipo;

	var promocoesHandler = function(res){
		$scope.promocoes = res;
	}
	Promocao[$scope.tipo === 'destaques' ? 'hot' : 'new'](promocoesHandler); // busca as promoções conforme a seleção

}

angular.module('Hipopocket').controller('IndexController', IndexController);
