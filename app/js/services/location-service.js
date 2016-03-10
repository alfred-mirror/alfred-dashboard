/* global MAPQUEST_KEY */
module.exports = function(app) {
  app.factory('GeoLocation', ['$http',
    function($http) {
      return {
        getLocation: function() {
          return new Promise(function(resolve) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var location = position.coords;
              console.log(location.latitude + ', ' + location.longitude);
              resolve(location);
            });
          });
        },
        // TODO: link variables to .env inputs
        geocoding: function() {
          var address = 'ADDRESS';
          var key = MAPQUEST_KEY;
          var locationURI = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + address;
          console.log(locationURI);
          return $http.get(locationURI);
        }
      };
    }
  ]);
};
