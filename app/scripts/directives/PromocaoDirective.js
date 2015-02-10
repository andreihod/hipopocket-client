angular.module("Hipopocket")

.directive('promocao', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/promocao.html',
        scope: {
	        data: '=data'
	     },
        controller: 'PromocaoController'
    };
});