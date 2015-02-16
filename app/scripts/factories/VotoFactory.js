VotoFactory = function ($resource, BaseUrl) {

	return $resource( BaseUrl + '/votes/:voto_promo_id', null,
            { 
            	'update': {method: 'PUT'}
            }
         );
	
}


angular.module('Hipopocket').factory('Voto', VotoFactory);