// ----- MENU CONTROLLER -----
angular.module('location.controllers').controller('MenuCtrl', function ($scope, $state) {
	$scope.path = $state.current.name;
});