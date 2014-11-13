angular.module('location.controllers').controller('PlugCtrl', function ($scope, $state, $stateParams, PlugService, PlugListService) {

    $state.go('main.plug.settings');
    $scope.action = $stateParams.action;
    $scope.plugService = PlugService;


    if ($stateParams.action == 'new') {
        $scope.plugService.init();
        $scope.submit = function () {
            $scope.plugService.create();
            $state.go('main.plugs');
        };
    } else {
        $scope.plugService.plug = PlugListService.plugs[$stateParams.index];
        // $scope.plugService.get($stateParams.index);
        $scope.submit = function () {
            $scope.plugService.save();
            $scope.original = angular.copy($scope.plugService.plug);
            $scope.modified = false;
        };
    }

    $scope.original = angular.copy($scope.plugService.plug);
    $scope.modified = false;
    $scope.$watch('plugService.plug', function (newPlug, oldPlug) {
        $scope.modified = !angular.equals($scope.plugService.plug, $scope.original);
    }, true);

});