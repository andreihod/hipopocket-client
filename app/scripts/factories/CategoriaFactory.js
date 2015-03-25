CategoriaFactory = function ($resource, BaseUrl) {
	
	return $resource( BaseUrl + '/categories/:cat_id');

}

angular.module('Hipopocket').factory('Categoria', CategoriaFactory);