// Service permettant les actions CRUD sur les RemotePlugs
angular.module('location.services').factory('PlugListService', function (Restangular, PlugService, ModalService) {


    var PlugListService = {

        plugs: null,

        setList: function () {
            Restangular.all('remotes').getList().then(function (response) {
                PlugListService.plugs = response;
            });
        },

        removePlug: function (plug) {
            ModalService.open({
                path: 'remove',
                args: {
                    title: 'Suppression d\'un plug',
                    message: 'Vous êtes sur le point de supprimer le plug « ' + plug.name + ' », voulez-vous vraiment continuer la suppression ?',
                    confirm: function (modal) {
                        plug.remove().then(function (response) {
                            PlugListService.setList();
                            modal.close();
                        });
                    }
                }
            });
        },

        getTotalWeeklyConsumption: function () {
            var total = 0;
            if (PlugListService.plugs !== null) {
                for (var i = 0; i < PlugListService.plugs.length; i++) {
                    total += PlugListService.getPlugWeeklyConsumption(i);
                }
            }
            return Math.round(total * 100) / 100;
        },

        getPlugWeeklyConsumption: function (index) {
            PlugService.plug = PlugListService.plugs[index];
            return PlugService.getWeeklyConsumption();
        }
    }

    return PlugListService;
});