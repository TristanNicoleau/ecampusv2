// ----- GLOBAL CONTROLLER (highest scope level $scope) -----
angular.module('location.controllers').controller('GlobalCtrl', function ($scope, AccessService) {

	// Watching changes on AccessService.user
	$scope.$watch(function () {
		return AccessService.user;
	}, function (user) {
		$scope.user = user;
	});

});