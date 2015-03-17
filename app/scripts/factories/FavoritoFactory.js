FavoritoFactory = function ($resource, BaseUrl) {
	
	return $resource( BaseUrl + '/favorites/:fav_promo_id', null,
            { 
            	'update': {
            				method: 'PUT',
                  			params: {
                      			fav_promo_id: "@fav_promo_id"
                  			}
                  		}
            }
         );
}


angular.module('Hipopocket').factory('Favorito', FavoritoFactory);