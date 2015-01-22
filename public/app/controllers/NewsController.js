// ----- NEWS CONTROLLER -----
angular.module('ecampusv2.controllers').controller('NewsController', function ($scope, NewsService) {
	console.log('NewsController loaded');
	$scope.newsService = NewsService;
	$scope.newsService.setList();
	console.log($scope.newsService.newsList);
});