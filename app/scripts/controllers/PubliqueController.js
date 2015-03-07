var PubliqueController = function ($scope, $rootScope, $routeParams, $location, Promocao) {

	$scope.promo = {};

	if ($routeParams.id) { // Se existir um id, busca a promoção
		Promocao.get({id: $routeParams.id}, function (p) {
			if ($rootScope.userAuthenticated.usuario_id !== p.promo_usuario_id) // Não pertence ao usuário, volta
				history.back();
			$scope.promo = p;
		});
	}
  
  $scope.cadastrar = function () {

		if(!$scope.promo.promo_id){
			Promocao.save(null, { promo_descr : $scope.promo.promo_descr, promo_url : $scope.promo.promo_url}, 
				function(res){
					$scope.promo.promo_id = res.returning_id;
					$scope.status = 'success';
					$scope.mensagem = 'Nova promoção publicada com sucesso';
				},
				function (res) {
					$scope.status = 'error';
					$scope.mensagem = res.msg;
				}
			);
		} else {
			Promocao.update({id: $scope.promo.promo_id}, { promo_descr : $scope.promo.promo_descr, promo_url : $scope.promo.promo_url},
				function (res) {
					$scope.status = 'success';
					$scope.mensagem = 'Promoção atualizada com sucesso';
				},
				function (res) {
					$scope.status = 'error';
					$scope.mensagem = res.msg;
				}
			);
		}

	}

	$scope.delete = function () {
		Promocao.delete({id: $scope.promo.promo_id},
			function(){
				$location.path('/');
			},
			function (res) {
				$scope.status = 'error';
				$scope.mensagem = res.msg;
			}
		);
	}
	
}

angular.module('Hipopocket').controller('PubliqueController', PubliqueController);