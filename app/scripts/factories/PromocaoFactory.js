PromocaoFactory = function ($resource, BaseUrl) {

	return $resource( BaseUrl + '/deals/:id', null,
    {
      'hot': {
      					method: 'GET',
      					params: {page: '1'},
      					url: BaseUrl + '/deals/hot/page/:page',
      					isArray: true
      				},
      'new': {
      					method: 'GET',
      					params: {page: '1'},
      					url: BaseUrl + '/deals/new/page/:page',
      					isArray: true
      				},
      'favorite': {
                method: 'GET',
                params: {page: '1'},
                url: BaseUrl + '/deals/favorite/page/:page',
                isArray: true
                },
      'query': {
                  method: 'GET',
                  params: {page: '1', type: 'hot'},
                  url: BaseUrl + '/deals/:type/search/:search/page/:page',
                  isArray: true
                },
      'update': {
                  method: 'PUT',
                  params: {
                      id: "@id"
                  }
                },
      'count': {
                  method: 'GET',
                  params: {type: 'hot'},
                  url: BaseUrl + '/deals/:type/count/search/:search'
                }

    });
	
}


angular.module('Hipopocket').factory('Promocao', PromocaoFactory);