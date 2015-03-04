var PubliqueController = function ($scope, $rootScope, $routeParams, Promocao) {

	$scope.id = $routeParams.id || null;
  
  $scope.cadastrar = function () {

		if(!$scope.id){
			Promocao.save(null, { promo_descr : $scope.descricao, promo_url : $scope.url}, 
				function(res){
					$scope.id = res.returning_id;
				}
			);
		} else {
			Promocao.update({id: $scope.id}, { promo_descr : $scope.descricao, promo_url : $scope.url});
		}

	}

	$scope.delete = function () {
		Promocao.delete({id: $scope.id});
		history.back();
	}
	
}

angular.module('Hipopocket').controller('PubliqueController', PubliqueController);