module.exports = function(app) {
  app.factory('GeoLocation', ['$http', '$window',
    function($http, $window) {
      return {
        getLocation: function() {
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var location = lat + ', ' + long;
            console.log(location);
            return location;
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
