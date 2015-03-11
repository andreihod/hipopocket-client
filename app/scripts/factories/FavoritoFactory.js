FavoritoFactory = function ($resource, BaseUrl) {
	
	return $resource( BaseUrl + '/favorite/:fav_promo_id', null,
            { 
            	'update': {method: 'PUT'}
            }
         );
}


angular.module('Hipopocket').factory('Favorito', FavoritoFactory);