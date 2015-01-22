// Création des modules principaux
angular.module('ecampusv2.services', ['ngResource']);
angular.module('ecampusv2.controllers', []);

// Module principal
var app = angular.module('ecampusv2', [
    'ngRoute',
    'ecampusv2.services',
    'ecampusv2.controllers'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'templates/home.html'
      }).
      when('/news', {
        templateUrl: 'templates/news.html',
        controller: 'NewsController'
      }).
      when('/files', {
        templateUrl: 'templates/files.html',
        controller: 'FtpController'
      }).
      when('/calendar', {
        templateUrl: 'templates/calendar.html',
        controller: 'CalendarController'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);