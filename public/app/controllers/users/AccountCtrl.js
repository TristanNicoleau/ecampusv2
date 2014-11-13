// ----- USER CONTROLLER (create, update, addPlug, removePlug) -----
angular.module('location.controllers').controller('AccountCtrl', function ($scope, AccountService) {

    AccountService.account = {};
    $scope.accountService = AccountService;

});