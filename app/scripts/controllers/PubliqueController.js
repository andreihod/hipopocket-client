var PubliqueController = function ($scope, $rootScope, Promocao) {
       $scope.cadastrar = function () {
		
		var promocao   = $scope;
		var id = null;

		if(Boolean(promocao.id)){
			id = promocao.id;
		}
		Promocao.save(id, { promo_descr : promocao.descricao, promo_url : promocao.url});
	}
}

angular.module('Hipopocket').controller('PubliqueController', PubliqueController);