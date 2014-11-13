angular.module('location.services').factory('ServerSettings', function () {
    var settings = {
        protocol: 'http://',
        hostname: 'localhost',
        port: 9090,
        apiRoot: '/api',
        path: function () {
            return settings.protocol + settings.hostname + ':' + settings.port + settings.apiRoot;
        }
    };

    return settings;
});