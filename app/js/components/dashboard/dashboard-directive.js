// const j = require('jquery');

module.exports = function(app) {
  app.directive('dashboard', function() {

    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'templates/dashboard.html',
      scope: {
        options: '='
      },
      controller: function($scope, Butler, $window, AuthFactory, GeoLocation) {
        $scope.configs = [];
        $scope.currentConfig = {};
        $scope.state = {
          editing: false
        };
        // Store UserId
        $scope.user_id = $window.sessionStorage._id;
        // Show Auth Container
        $scope.$on('USER_AUTHENTICATED', function() {
          $scope.getConfig();
        });
        // Update config file on server
        $scope.updateConfig = function(config) {
          // Update config on server
          Butler.updateConfig(config)
            .then(function(res) {
              // Update Events
              $scope.getConfig();
            }, function(err) {
              // Error
              console.log(err);
            });
        };
        // Edit Config File
        $scope.editConfig = function(config) {
          $scope.currentConfig = config;
          $scope.state.editing = true;
        };
        // Logout
        $scope.logout = function() {
          AuthFactory.logout();
        };
        /// Load user preferences
        $scope.getConfig = function() {

          Butler.getConfig()
            .then(function(res) {
              console.log(res.data);
              $scope.configs = res.data;
            }, function(err) {
              console.log(err);
            });
        };
        $scope.getLocation = function() {
          GeoLocation.getLocation();
        };

        $scope.geocoding = function() {
          GeoLocation.geocoding()
            .then(function(res) {
              console.log('lat ' + res.data.results[0].locations[0].latLng.lat);
              console.log('lng ' + res.data.results[0].locations[0].latLng.lng);
            }, function(err) {
              console.log(err);
            });
        };

        $scope.onDrop = function(e, data) {
          var hasAWidget = j(e.target).has('p').length > 0;
          var id_of_droppable = j(e.target).attr('id');
          var id_of_draggable = j('#' + data.id).parent().attr('id');

          if (hasAWidget && id_of_droppable !== 'widgetBank'){
            return console.log('already has a widget');
          }

          // cache element and add the widget to the box
          var widget = j('#' + data.id);
          j(e.target).append(widget);

          // check if we're dropping into the bank
          if (id_of_droppable === 'widgetBank') {
            // from the bank to the bank
            if (id_of_droppable == id_of_draggable) {
              return;
            }
            $scope.currentConfig.modules[id_of_draggable] = undefined;
            return;
          }

          // add the widget to the module at correct position
          $scope.currentConfig.modules[id_of_droppable] = widget.text();
          // if the what the widget came from is widgetBank then go back
          // before making the index undifined in the modules array
          if (id_of_draggable === 'widgetBank') {
            return;
          }

          // remove it from the modules index
          $scope.currentConfig.modules[id_of_draggable] = undefined;
        };
      }
    };
  });
};
