var IndexController = function ($scope, $routeParams, $location, Promocao) {
	
	$scope.tipo = $routeParams.tipo === 'destaques' ? 'hot' : 'new';
	$scope.page = parseInt($routeParams.page || 1);

	// busca as promoções conforme o tipo e a página
	Promocao[$scope.tipo]({page: $scope.page}, function(res){
		$scope.promocoes = res;
	});

	$scope.setPage = function (page) {
		$location.url('/' + $routeParams.tipo + '/page/' + page);
	}

}

angular.module('Hipopocket').controller('IndexController', IndexController);
