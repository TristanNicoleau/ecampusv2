// ----- AUTHENTICATION CONTROLLER (login, logout) -----
angular.module('location.controllers').controller('AuthCtrl', function ($scope, AuthService) {
	$scope.auth = AuthService;
});