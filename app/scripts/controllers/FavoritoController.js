var FavoritoController = function ($scope, $rootScope, Favorito) {

	$scope.favorite = function () {
		Favoritar();
	}

	var Favoritar = function () {

		// Somente prosseguir se estiver logado
		if (!$rootScope.isLogged())
			return;

		var promo   = $scope.promocao;
		var possuiFavorito = Boolean(promo.fav_promo_id);

		if(possuiFavorito){
			promo.fav_promo_id = null;
			Favorito.delete({fav_promo_id : promo.promo_id});

		}else{
			Favorito.save(null, {fav_promo_id : promo.promo_id});
			promo.fav_promo_id = promo.promo_id;
		}



	}
	
}



angular.module('Hipopocket').controller('FavoritoController', FavoritoController);
