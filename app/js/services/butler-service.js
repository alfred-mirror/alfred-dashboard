module.exports = function(app) {
  app.factory('Butler', ['$http', '$window',
    function($http, $window) {
    const baseURI = 'http://localhost:8080/dashboard/preferences'
      return {
      	// Load User Preferences
        getPreferences: function() {
        	return $http.get(baseURI);
        }
      }
    }
  ])
}