angular.module('location.services').factory('ModalService', function ($rootScope, $modal) {
    var ModalService = {

        modal: null,

        args: {},

        open: function (properties) {
            var modalScope = $rootScope.$new();
            ModalService.args = properties.args;
            modalScope.service = ModalService;
            ModalService.modal = $modal.open({
                templateUrl: 'views/modals/' + properties.path + '.html',
                scope: modalScope
            });
        },

        close: function () {
            ModalService.modal.close();
        }
    };

    return ModalService;
});