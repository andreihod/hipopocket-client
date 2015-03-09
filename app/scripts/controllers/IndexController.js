var IndexController = function ($scope, $rootScope, $routeParams, $location, Promocao) {
	
	$scope.tipo = $routeParams.tipo === 'destaques' ? 'hot' : 'new';
	$scope.page = parseInt($routeParams.page || 1);

	$scope.setPage = function (page) {
		$location.url('/' + $routeParams.tipo + '/page/' + page);
	}

	$rootScope.$watch('query', function () {		
		if ($rootScope.query) { // Se possui query
			Promocao.query({search: $rootScope.query, type: $scope.tipo, page: $scope.page}, function(res){
				$scope.promocoes = res;

				Promocao['count']({search: $rootScope.query, type: $scope.tipo}, function(res){
					$scope.pagesQuantity = res[0];
				});
			});
		} else {
			// Se não possui query, ou for a primeira vez que entra no app
			// busca as promoções conforme o tipo e a página
			Promocao[$scope.tipo]({page: $scope.page}, function(res){
				$scope.promocoes = res;

				Promocao['count']({type: $scope.tipo}, function(res){
					$scope.pagesQuantity = res[0];
				});

			});
		}
	});
}

angular.module('Hipopocket').controller('IndexController', IndexController);
