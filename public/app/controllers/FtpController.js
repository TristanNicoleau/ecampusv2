// ----- FTP CONTROLLER -----
angular.module('ecampusv2.controllers').controller('FtpController', function ($scope, FtpService) {
	console.log('FtpController loaded');
	$scope.ftpService = FtpService;
	$scope.ftpService.getFileTree();
});