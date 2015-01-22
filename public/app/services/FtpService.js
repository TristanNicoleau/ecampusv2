// Service permettant les actions CRUD sur le FTP
angular.module('ecampusv2.services').factory('FtpService', function ($http) {


    var FtpService = {

        fileTree: null,

        getFileTree: function () {
          console.log('Get file tree from server');
          $http.get('http://localhost:8080/api/ftp').
            success(function(data, status, headers, config) {
              FtpService.fileTree = data;
              console.log(data);
            }).
            error(function(data, status, headers, config) {
              console.log(status);
            });
        },


        getFile: function (){

        },

        add: function (file){

        }
    }

    return FtpService;
});