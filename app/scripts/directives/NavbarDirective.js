angular.module("Hipopocket")

.directive('navbar', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/navbar.html',
        controller: 'NavbarController'
    };
});