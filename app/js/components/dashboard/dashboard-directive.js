const j = require('jquery');

module.exports = function(app) {
  app.directive('dashboard', function() {

    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'templates/dashboard.html',
      scope: {
        options: '='
      },

      controller: function($scope, Butler, $window, AuthFactory) {



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

        $scope.onDrop = function(e, data) {
          var hasAWidget = j(e.target).has('p').length > 0;
          var id_of_droppable = j(e.target).attr('id');
          if (hasAWidget && id_of_droppable !== 'widgetBank'){
            return console.log('already has a widget');
          } else {
            console.log($scope.currentConfig.modules);
            // cache element and add the widget to the box
            var widget = j('#' + data.id);
            j(e.target).append(widget);
            // add the widget to the module at correct position
            // var index = j(e.target).attr('id');
            $scope.currentConfig.modules[id_of_droppable] = widget.text();
            // remove it from the old box and old 
            // j('#' + data.id).remove();

            console.log($scope.currentConfig.modules);

          }
        };


      }
    };
  });
};