var angular = require('angular');
require('angular-route');

var alfred = angular.module('alfred', [require('angular-drag-drop'), 'ngRoute']);

// Require Services
require('./services/services-index.js')(alfred);
// Require Auth
require('./components/auth/auth-index.js')(alfred);
// Require Dashboard
require('./components/dashboard/dashboard-index.js')(alfred);
// Require User 
require('./components/user/user-index.js')(alfred);

// Add Token Middleware
alfred
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

.config(['$routeProvider', '$locationProvider',
  function(routeProvider, locationProvider) {
    routeProvider
      .when('/', {
        templateUrl: 'templates/auth.html'
      })
      .when('/dashboard', {
        template: '<dashboard></dashboard>',
        controller: 'HomeController'
      })
  }
])

.run(function($window, EE, $rootScope, $location) {
  if ($window.sessionStorage.token && $window.sessionStorage._id) {
    $rootScope.authenticated = true;
  }

  $rootScope.$on('USER_AUTHENTICATED', function() {
    $location.path('/dashboard');
  });
})

.controller('HomeController', ['$scope',
  function($scope) {
    $scope.userAuthenticated = false;

    $scope.$on('USER_AUTHENTICATED', function() {
      $scope.userAuthenticated = true;
    });
  }
]);