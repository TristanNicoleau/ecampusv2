// Création des modules principaux
angular.module('location.services', ['ngResource', 'restangular']);
angular.module('location.controllers', []);
angular.module('location.directives', []);
angular.module('location.filters', []);

// Module principal
var app = angular.module('location', [
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'location.services',
    'location.controllers',
    'location.directives',
    'location.filters'
]);

// ============================== ROUTES ==============================
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider) {

    // Restangular config
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
        id: "_id"
    });

    // Intercepteur de réponse HTTP : Modification des timeStart et timeEnd pour chaque slot (ISODate to Date)
    RestangularProvider.setResponseInterceptor(
        function (data, operation, what, url, response) {
            if (operation === 'getList' && what === 'remotes' && url.match('/api/remotes')) {
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].slots.length; j++) {
                        data[i].slots[j].timeStart = new Date(data[i].slots[j].timeStart);
                        data[i].slots[j].timeEnd = new Date(data[i].slots[j].timeEnd);
                    }
                }
            }
            return response.data;
        }
    );

    //For any unmatched url, redirect to / home
    $urlRouterProvider.otherwise("/home");

    var menu = {
        controller: 'MenuCtrl',
        templateUrl: 'views/fragment/common/menu.html'
    };

    $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: 'views/fragment/common/main-layout.html'
        }).state('main.home', {
            url: '/home',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    templateUrl: 'views/fragment/home.html'
                }
            }
        }).state('main.thermostat', {
            url: '/thermostat',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    templateUrl: 'views/fragment/thermostat.html'
                }
            }
        }).state('main.plugs', {
            url: '/plugs',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    controller: 'PlugListCtrl',
                    templateUrl: 'views/fragment/plugs.html'
                }
            }
        }).state('main.plug', {
            url: '/plug/{index}/:action',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    controller: 'PlugCtrl',
                    templateUrl: 'views/fragment/plug.html'
                }
            }
        }).state('main.plug.settings', {
            url: '/settings',
            restricted: true,
            templateUrl: 'views/fragment/plug/settings.html'
        }).state('main.plug.slots', {
            url: '/slots',
            restricted: true,
            templateUrl: 'views/fragment/plug/slots.html',
            controller: 'SlotCtrl'
        }).state('main.plug.devices', {
            url: '/devices',
            restricted: true,
            templateUrl: 'views/fragment/plug/devices.html',
            controller: 'DeviceCtrl'
        }).state('main.manual', {
            url: '/manual',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    templateUrl: 'views/fragment/manual.html'
                }
            }
        }).state('main.profile', {
            url: '/profile',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    templateUrl: 'views/fragment/profile.html'
                }
            }
        }).state('main.settings', {
            url: '/settings',
            restricted: true,
            views: {
                sidebar: menu,
                content: {
                    controller: 'PlugListCtrl',
                    templateUrl: 'views/fragment/settings.html'
                }
            }
        }).state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'AuthCtrl'
        }).state('account', {
            url: '/account',
            views: {
                '@': {
                    templateUrl: 'views/account.html',
                    controller: 'AccountCtrl'
                }
            }
        }).state('lost', {
            url: '/lost',
            views: {
                '@': {
                    templateUrl: 'views/rejections/lost.html'
                }
            }
        });

    $httpProvider.interceptors.push(function ($location, $q) {
        return {
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/login');
                    console.log('Accès non autorisé');
                } else if (rejection.status === 404) {
                    $location.path('/lost');
                    console.log('Page non trouvée');
                } else if (rejection.status === 500) {
                    $location.path('/account');
                    console.log('Erreur serveur');
                }
                return $q.reject(rejection);
            }
        };
    });

});

// ============================= STARTUP ===============================
app.run(function ($rootScope, $state, $location, $cookies, AccessService) {
    if (!$cookies.id) {
        $state.go('login');
    } else {
        AccessService.getUserSession($cookies.id);
    }

    // Check if user is connected
    $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.restricted && !$cookies.id && !AccessService.user) {
            event.preventDefault();
            // TODO Page denied
            $state.go('login');
        }
    });
});