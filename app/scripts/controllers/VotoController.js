var VotoController = function ($scope, Voto) {

	$scope.upvote = function () {
		Votar('U');
	}

	$scope.downvote = function () {
		Votar('D');	
	}

	var Votar = function (tipo) {
		// Somente prosseguir se estiver logado
		var promo   = $scope.promocao;
		var oldvoto = promo.voto_tipo;
		var possuiVoto = Boolean(promo.voto_tipo);		
		if (possuiVoto) {
			if (tipo !== promo.voto_tipo) {
				Voto.update({voto_promo_id: promo.promo_id}, {voto_tipo: tipo});
				promo.voto_tipo = tipo;
				promo[tipo === 'U' ? 'promo_upvotes' : 'promo_downvotes']++;
				promo[oldvoto === 'U' ? 'promo_upvotes' : 'promo_downvotes']--;
			} else { // Caso o usuário tenha clicado no mesmo voto, deleta
				delete promo.voto_tipo;
				Voto.delete({voto_promo_id: promo.promo_id});
				promo[tipo === 'U' ? 'promo_upvotes' : 'promo_downvotes']--;
			}
		} else {			
			Voto.save(null, {voto_promo_id: promo.promo_id, voto_tipo: tipo});
			promo.voto_tipo = tipo;
			promo[tipo === 'U' ? 'promo_upvotes' : 'promo_downvotes']++;
		}
		promo.promo_votos = promo.promo_upvotes - promo.promo_downvotes;
	}
	
}



angular.module('Hipopocket').controller('VotoController', VotoController);
