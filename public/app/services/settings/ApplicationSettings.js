angular.module('location.services').value('ApplicationSettings', {
	plugNumberFormat: ["1", "2", "3", "4", "5", "A", "B", "C", "D"],
	weekdays: [
		{
			name: "Lundi",
			value: 0
		}, {
			name: "Mardi",
			value: 1
		}, {
			name: "Mercredi",
			value: 2
		}, {
			name: "Jeudi",
			value: 3
		}, {
			name: "Vendredi",
			value: 4
		}, {
			name: "Samedi",
			value: 5
		}, {
			name: "Dimanche",
			value: 6
		}
	]
});