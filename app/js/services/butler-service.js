module.exports = function(app) {
  app.factory('Butler', ['$http', '$window',
    function($http, $window) {
      const baseURI = BASE_URI + '/dashboard/preferences';

      return {
        // Load User Preferences
        getConfig: function() {
          return $http.get(baseURI);
        },
        updateConfig: function(config) {
          var URI = baseURI + '/' + config._id;
          return $http.put(URI, config);
        }
      };
    }
  ]);
};
