UsuarioFactory = function ($resource, BaseUrl) {

	return $resource( BaseUrl + '/users/:id', null,
			{
				'me' : {method: 'GET', url: BaseUrl + '/users/me'},
				'logout': {method: 'GET', url: BaseUrl + '/logout'}
			}
		);
	
}


angular.module('Hipopocket').factory('Usuario', UsuarioFactory);