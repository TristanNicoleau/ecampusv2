// ----- USERLIST CONTROLLER (load the whole user list in $scope) -----
angular.module('location.controllers').controller('UserListCtrl', function ($scope, UserService) {

    $scope.users = UserService.query();

});