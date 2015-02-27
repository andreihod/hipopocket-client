var PubliqueController = function ($scope, $rootScope, Promocao) {
       $scope.cadastrar = function () {
		
		var promocao   = $scope.promocao;

		// Já criou a promoção, faz update
		if (promocao != "undefined" && Boolean(promocao) && Boolean(promocao.id)) {
			Promocao.update({promo_descr : promo_descr, promo_url : promo_url});

		} else {
			Promocao.save(null, { promo_descr : $scope.descricao, promo_url : $scope.url});
		}
	}
}

angular.module('Hipopocket').controller('PubliqueController', PubliqueController);