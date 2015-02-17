var NavbarController = function ($scope, $rootScope, $window, Usuario, BaseUrl) {

	$rootScope.userAuthenticated = null;
	$rootScope.userState = 'authenticating'; 

	Usuario.me(
		function(data){
			$rootScope.userAuthenticated = data;
			$rootScope.userState = 'logged';
		},
		function(data){
			$rootScope.userAuthenticated = null;
			$rootScope.userState = 'unauthorized';
		}
	);

	$scope.login = function (provider) {
		$window.location.href = BaseUrl + '/auth/' + provider;
	}

	$scope.logout = function () {
		Usuario.logout(function(){
			$window.location.reload();
		});
	}

}

angular.module('Hipopocket').controller('NavbarController', NavbarController);