var FavoritoController = function ($scope, $rootScope, Favorito) {

	$scope.favorite = function () {
		Favoritar();
	}

	var Favoritar = function () {
		// Somente prosseguir se estiver logado
		if (!$rootScope.isLogged())
			return;

		var promo   = $scope.promocao;
		var v = Favorito.get(promo.promo_id);
		console.log(v);

		/*if (tipo === 'F') {
			Favorito.save(null, {fav_promo_id: promo.promo_id});
		}else{
			Favorito.delete({fav_promo_id: promo.promo_id});
		}*/
	}
	
}



angular.module('Hipopocket').controller('FavoritoController', FavoritoController);
