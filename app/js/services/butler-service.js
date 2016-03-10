/* global BASE_URI */

module.exports = function(app) {
  app.factory('Butler', ['$http',
    function($http) {
      const baseURI = BASE_URI + '/dashboard/config';

      return {
        // Load User Preferences
        getConfig: function() {
          return $http.get(baseURI);
        },
        updateConfig: function(config) {
          var URI = baseURI + '/' + config._id;
          return $http.put(URI, config);
        },
        setConfig: function(config) {
          var URI = baseURI + '/setConfig/' + config._id;
          return $http.post(URI);
        },
        getUser: function() {
          var URI = BASE_URI + '/user/' + $window.sessionStorage._id;
          return $http.get(URI);
        },
        updateUser: function(user) {
          var URI = BASE_URI + '/user/update/' + $window.sessionStorage._id;
          return $http.put(URI, user);
        }
      };
    }
  ]);
};
