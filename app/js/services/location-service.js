
module.exports = function(app) {
  app.factory('GeoLocation', ['$http', '$window',
    function($http, $window) {
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
          var address = '588 Bell St, Seattle WA';
          var key = 'YYPegISg2qDL5oyBePy69GouYxOj1aeU';
          var locationURI = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + key + '&location=' + address;
          console.log(locationURI);
          return $http.get(locationURI);
        }
      };
    }
  ]);
};
