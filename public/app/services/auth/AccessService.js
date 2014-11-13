// Service global de l'application (création du scope global contenant l'objet user)
angular.module('location.services').factory('AccessService', function ($state, Restangular) {
    var AccessService = {
        user: null,
        getUserSession: function (userId) {
            Restangular.one('users', userId).get().then(function (user) {
                AccessService.user = user;
                $state.go('main.home');
            });
        }
    };
    return AccessService;
});