/*global moment*/
angular.module('location.services').factory('MomentService', function () {

    moment.formatDuration = function (duration) {
        var result = '';

        if (duration.days() > 0) {
            result += moment.duration(duration.days(), 'days').humanize() + ' ';
        }

        if (duration.hours() > 0) {
            result += moment.duration(duration.hours(), 'hours').humanize() + ' ';
        }

        if (duration.minutes() > 0) {
            result += moment.duration(duration.minutes(), 'minutes').humanize();
        }
        return result;
    };

    return moment;
});