// Service permettant les actions CRUD sur les RemotePlugs
angular.module('location.services').factory('PlugService', function (Restangular, AccessService, ApplicationSettings, ModalService) {


    var PlugService = {

        plug: null,

        init: function () {
            var newPlug = {};
            newPlug.owners = [];
            newPlug.owners.push(AccessService.user._id);
            newPlug.plugNumber = [];
            for (var i = 0; i < PlugService.plugNumberFormat.length; i++) {
                newPlug.plugNumber.push(0);
            }
            newPlug.status = 'off';
            newPlug.active = 0;
            newPlug.devices = [];
            newPlug.slots = [];
            PlugService.plug = newPlug;
        },

        create: function () {
            Restangular.all('remotes').post(PlugService.plug);
        },

        save: function () {
            // TODO : Info (alert) de la sauvegarde du plug
            PlugService.plug.save();
        },

        activateSwitch: function (value) {
            var plugNumberStr = PlugService.plug.plugNumber.join('');
            PlugService.plug.customPOST({
                    active: value,
                    group: plugNumberStr.substring(0, 5),
                    convector: plugNumberStr.substring(5, plugNumberStr.length) + '0'
                },
                "switch", {}, {}
            );
        },

        getWeeklyConsumption: function () {
            var hours = PlugService.getTotalActivation() * (2.77777777777778E-7);
            var kiloWatts = PlugService.getTotalPower() / 1000;
            return Math.round(hours * kiloWatts * 100) / 100;
        },

        getTotalActivation: function () {
            var total = 0;
            for (var i = 0; i < PlugService.plug.slots.length; i++) {
                total += PlugService.getSlotDuration(PlugService.plug.slots[i]);
            }
            return total;
        },

        getTotalPower: function () {
            var total = 0;
            for (var i = 0; i < PlugService.plug.devices.length; i++) {
                total += PlugService.plug.devices[i].power;
            }
            return total;
        },

        getSlotDuration: function (slot) {
            return ((slot.weekdayEnd.value - slot.weekdayStart.value) * 86400000) + (slot.timeEnd - slot.timeStart);
        },

        plugNumberFormat: ApplicationSettings.plugNumberFormat
    }

    return PlugService;
});