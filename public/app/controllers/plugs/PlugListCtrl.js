// ----- REMOTEPLUG CONTROLLER -----
angular.module('location.controllers').controller('PlugListCtrl', function ($scope, PlugListService, PlugService) {
	$scope.plugListService = PlugListService;
	$scope.plugListService.setList();
	console.log($scope.plugListService.plugs);
});