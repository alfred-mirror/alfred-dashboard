// Handles Token Retrevial and Creation
module.exports = function(app) {
  app.factory('AuthFactory', ['$http', '$window',
    function($http, $window) {
      const baseURI = 'http://localhost:8080/auth';
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
          document.location.reload(true);
        }
      };
    }
  ]);
};
