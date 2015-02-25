var PromocaoController = function ($scope, $rootScope, Promocao) {
	
	var Cadastrar = function () {
		if (!$rootScope.isLogged())
			return;

		var promocao   = $scope.promocao;

		// Já criou a promoção, faz update
		if (Boolean(promocao.id)) {
			
			Promocao.update({promo_descr : promo_descr, promo_url : promo_url});

		} else {
			
			Promocao.save(null, {voto_promo_id: promo.promo_id, voto_tipo: tipo});
		}
	}
	
}

angular.module('Hipopocket').controller('PromocaoController', PromocaoController);
