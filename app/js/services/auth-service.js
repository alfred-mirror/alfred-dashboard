/* eslint-disable no-undef */

// Handles Token Retrevial and Creation
module.exports = function(app) {
  app.factory('AuthFactory', ['$http', '$window', '$location',
    function($http, $window, $location) {
      const baseURI = BASE_URI + '/auth';
      return {
        login: function(data) {
          var headerData = data.email + ':' + data.password;
          headerData = btoa(headerData);

          return $http({
            method: 'GET',
            url: baseURI + '/login',
            headers: {
              authorization: 'Basic ' + headerData
            }
          });
        },

        register: function(data) {
          var toSend = {
            authentication: {
              email: data.email,
              password: data.password
            }
          };

          return $http({
            method: 'POST',
            url: baseURI + '/register',
            data: toSend
          });
        },

        logout: function() {
          delete $window.sessionStorage.token;
          delete $window.sessionStorage._id;
          $location.path('/');
        },

        passwordValidation: function(data) {
          if (data.password !== data.passwordCheck) {
            return true;
          }
          else if (data.password.length < 7) {
            return true;
          } else {
            return false;
          }
        }
      };
    }
  ]);
};
