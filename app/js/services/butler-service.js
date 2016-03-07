module.exports = function(app) {
  app.factory('Butler', ['$http',
    function($http) {
    const baseURI = 'http://localhost:8080/dashboard/preferences'
      return {
        getPreferences: function() {
        	var url = baseURI;
        	return $http.get(url);
        }
      }
    }
  ])
}