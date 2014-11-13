// Service permettant les actions de login et logout
angular.module('location.services').factory('AuthService', function ($cookies, $state, $window, Restangular, CryptoService, AccessService, ModalService) {
    'use strict'
    var AuthService = {
        login: function (username, password) {
            console.log(username + "/" + password);
            Restangular.all('login').post({
                username: username,
                password: CryptoService.encodePassword(password)
            }).then(function (response) {
                console.log(response);
                if (response !== undefined) {
                    if (response.active !== undefined && !response.active) {
                        ModalService.open({
                            path: 'error',
                            args: {
                                title: 'Erreur d\'authentification',
                                message: 'L\'utilisateur n\'a pas validé son adresse mail.'
                            }
                        });
                    } else {
                        AccessService.getUserSession(response.userId);
                        $cookies.id = response.userId;
                        $state.go('main.home');
                    }
                } else {
                    ModalService.open({
                        path: 'error',
                        args: {
                            title: 'Erreur d\'authentification',
                            message: 'Les identifiants et mots de passe que vous avez saisi ne sont pas valides.'
                        }
                    });
                }
            });
        },
        logout: function () {
            Restangular.one('logout').get().then(function (res) {
                if (res.result) {
                    AccessService.user = null;
                    delete $cookies.id;
                    $state.go('login');
                } else {
                    ModalService.open({
                        path: 'error',
                        args: {
                            title: 'Erreur de déconnexion',
                            message: 'Echec lors de la déconnexion.'
                        }
                    });
                }
            });
        }
    };
    return AuthService;
});