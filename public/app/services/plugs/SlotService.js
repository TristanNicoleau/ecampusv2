angular.module('location.services').factory('SlotService', function (ApplicationSettings, MomentService) {

    var SlotService = {},
        SlotPicker = function (slot) {
            this.slot = slot;
            this.timeEnd = new Date(this.slot.start.getTime() + 60000);

            this.updated = function (field) {

                if (this.slot.start.getTime() + 60000 > this.timeEnd.getTime()) {
                    if (field === 'start') {
                        this.timeEnd = new Date(this.timeStart.getTime() + 60000);
                    } else {
                        this.timeStart = new Date(this.timeEnd.getTime() - 60000);
                    }
                }

                this.slot.duration = this.timeEnd.getTime() - this.slot.start.getTime();
                this.duration = MomentService.formatDuration(MomentService.duration(this.slot.duration));
            };

            this.duration = MomentService.formatDuration(MomentService.duration(this.slot.duration));
        },
        Slot = function (start, duration) {
            this.start = start || new Date();
            this.duration = duration || 60000;
            this.weekday = 'TODO';
        },
        Plug = function () {
            var i, len;
            this.slots = [new Slot()];
            this.plugNumber = [];
            for (i = 0, len = ApplicationSettings.plugNumberFormat.length; i < len; i++) {
                this.plugNumber.push(0);
            }
            this.place = "";
            this.status = "OFF";
            this.active = false;
        };

    SlotService.getSlotsDurationFormatted = function (slotpickers) {
        var i = 0,
            len = slotpickers.length,
            duration = 0;
        for (i, len; i < len; i++) {
            duration += slotpickers[i].slot.duration;
        }
        return MomentService.formatDuration(MomentService.duration(duration));
    };

    SlotService.SlotPicker = SlotPicker;
    SlotService.Plug = Plug;
    SlotService.Slot = Slot;

    return SlotService;
});