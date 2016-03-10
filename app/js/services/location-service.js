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
        }
      };
    }
  ]);
};
