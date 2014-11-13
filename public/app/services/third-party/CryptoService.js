/*global CryptoJS*/
angular.module('location.services').factory('CryptoService', function () {
    return {
        encodePassword: function (password) {
            return CryptoJS.SHA3(password).toString();
        }
    };
});