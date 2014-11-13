// ----- DEVICE CONTROLLER -----
angular.module('location.controllers').controller('SlotCtrl', function ($scope, ModalService, ApplicationSettings) {

  $scope.weekdays = ApplicationSettings.weekdays;

  $scope.modalSlot = function (slot) {
    if (slot === undefined) {
      var currentDate = new Date();
      var modalSlot = {
        timeStart: currentDate,
        timeEnd: currentDate
      }
      $scope.indexEditSlot = null;
    } else {
      var modalSlot = angular.copy(slot);
      $scope.indexEditSlot = $scope.plugService.plug.slots.indexOf(slot);
    }

    ModalService.open({
      path: 'plugs/slot',
      args: {
        slotScope: $scope,
        slot: modalSlot
      }
    });
  }

  $scope.saveSlot = function (slot) {
    if ($scope.indexEditSlot != null) {
      $scope.plugService.plug.slots[$scope.indexEditSlot] = slot;
    } else {
      $scope.plugService.plug.slots.push(slot);
    }
    ModalService.modal.close();
  }

  $scope.removeSlot = function (index) {
    $scope.plugService.plug.slots.splice(index, 1);
  }

  $scope.getDuration = function () {

  }

});