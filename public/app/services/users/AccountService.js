// Service permettant les actions CRUD sur le User
angular.module('location.services').factory('AccountService', function (Restangular, ModalService, CryptoService) {
    'use strict'
    var AccountService = {

        account: {},
        confirmPassword: null,
        create: function () {

            if (AccountService.account.password !== AccountService.confirmPassword) {
                ModalService.open({
                    path: 'error',
                    args: {
                        title: 'Erreur de saisie',
                        message: 'Les mots de passe que vous avez saisi sont différents'
                    }
                });
                AccountService.account.password = null;
                AccountService.confirmPassword = null;
            } else {
                AccountService.saveNewAccount();
            }
        },

        saveNewAccount: function () {
            AccountService.account.password = CryptoService.encodePassword(AccountService.account.password);
            var userRoutes = Restangular.all('users');
            console.log(AccountService.account);
            userRoutes.post(AccountService.account).then(function (response) {
                console.log(response);
                if (response.code === 1) {
                    ModalService.open({
                        path: 'error',
                        args: {
                            title: 'Problème rencontré lors de la création du compte',
                            message: 'Ce nom d\'utilisateur est déjà utilisé !'
                        }
                    });
                } else if (response.code === 2) {
                    ModalService.open({
                        path: 'error',
                        args: {
                            title: 'Problème rencontré lors de la création du compte',
                            message: 'Cette adresse mail est déjà utilisée !'
                        }
                    });
                } else if (response.code === 0) {
                    ModalService.open({
                        path: 'success',
                        args: {
                            title: 'Compte créé avec succès',
                            message: 'Votre compte a été créé avec succès ! Un e-mail de confirmation vient de vous être envoyé.'
                        }
                    });
                    console.log(response.user);
                    // response.user.customGET("mail/confirm");
                }
                AccountService.account.password = null;
                AccountService.confirmPassword = null;
            });
        }
    };
    return AccountService;
});