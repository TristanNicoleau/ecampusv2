angular.module('location.filters').filter('TimeFilter', function () {
	return function (milliseconds) {
		var minutes = ('0' + Math.round(milliseconds / (1000 * 60) % 60)).slice(-2);
		var hours = ('0' + Math.round(milliseconds / (1000 * 60 * 60))).slice(-2);
		return hours + ':' + minutes;
	};
});