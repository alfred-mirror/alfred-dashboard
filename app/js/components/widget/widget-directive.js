module.exports = function(app) {
  app.directive('widgetForm', function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'templates/widget.html',
      controller: function($scope, Widget, GeoLocation) {
        // New Widget
        $scope.newWidget = {
          options: {}
        };

        // Actually send the Request
        $scope.actuallyAdd = function() {
          // Add Widget
          Widget.addWidget($scope.newWidget)
            .then(function(res) {
              Widget.widgets.push(res);
              $scope.current = "";
              $scope.destination = "";
              $scope.newWidget = {
                options: {}
              }
            });
        }


        // Add Widget
        $scope.addWidget = function() {
          // Commute
          if ($scope.newWidget.type === 'commute') {
            // Coords Promises
            var current = GeoLocation.geocoding($scope.current);
            var dest = GeoLocation.geocoding($scope.destination);
            // Resolve
            Promise.all([current, dest])
              .then(function(res) {
                console.log('hit');
                // Origin
                $scope.newWidget.options.origin = {
                  lat: res[0].data.results[0].locations[0].latLng.lat,
                  long: res[0].data.results[0].locations[0].latLng.lng
                }
                // Destination
                $scope.newWidget.options.destination = {
                  lat: res[1].data.results[0].locations[0].latLng.lat,
                  long: res[1].data.results[0].locations[0].latLng.lng
                }
                // Create Widget
                $scope.actuallyAdd();
              });
            // Weather
          } else if ($scope.newWidget.type === 'weather') {
            GeoLocation.geocoding($scope.current)
              .then(function(res) {
                // Set location
                $scope.newWidget.options.location = {
                  lat: res.data.results[0].locations[0].latLng.lat,
                  long: res.data.results[0].locations[0].latLng.lng
                };
                // Create Widget
                $scope.actuallyAdd();
              });
          } else {
            // Create Widget
            $scope.actuallyAdd();
          }
        };

        // Edit Widget
        $scope.editWidget = function(editedWidget) {
          Widget.editWidget(editedWidget)
            .then(function(res) {
              console.log(res);
            });
        }
      }
    }
  });
}