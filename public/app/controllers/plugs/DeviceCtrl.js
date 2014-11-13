// ----- DEVICE CONTROLLER -----
angular.module('location.controllers').controller('DeviceCtrl', function ($scope, ModalService) {

	$scope.modalDevice = function (device) {
		if (device === undefined) {
			$scope.indexEditDevice = null;
		} else {
			var modalDevice = angular.copy(device);
			$scope.indexEditDevice = $scope.plugService.plug.devices.indexOf(device);
		}

		ModalService.open({
			path: 'plugs/device',
			args: {
				deviceScope: $scope,
				device: modalDevice
			}
		});
	}

	$scope.saveDevice = function (device) {
		if ($scope.indexEditDevice !== null) {
			$scope.plugService.plug.devices[$scope.indexEditDevice] = device;
		} else {
			$scope.plugService.plug.devices.push(device);
		}
		ModalService.modal.close();
	}

	$scope.removeDevice = function (index) {
		$scope.plugService.plug.devices.splice(index, 1);
	}

});