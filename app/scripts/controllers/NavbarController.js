var NavbarController = function ($scope, $window, BaseUrl) {

	$scope.login = function (provider) {
		$window.location.href = BaseUrl + '/auth/' + provider;
	}

}

angular.module('Hipopocket').controller('NavbarController', NavbarController);