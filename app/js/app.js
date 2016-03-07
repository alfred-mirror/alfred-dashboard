var angular = require('angular');

var alfred = angular.module('alfred', []);

// Require Services
require('./services/services-index.js')(alfred);
// Require Auth
require('./components/auth/auth-index.js')(alfred);
// Require Dashboard
require('./components/dashboard/dashboard-index.js')(alfred);

// Add Token Middleware
alfred
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .run(function($window, EE, $rootScope) {
    if ($window.sessionStorage.token && $window.sessionStorage._id) {
      $rootScope.authenticated = true;
    }
  })

  .controller('HomeController', ['$scope',
    function($scope) {
      $scope.userAuthenticated = false;

      $scope.$on('USER_AUTHENTICATED', function(){
        $scope.userAuthenticated = true;
      });
    }
  ]);
