module.exports = function(app) {
  app.directive('dashboard', function() {
    return {
      restrict: 'AEC',
      replace: true,
      templateUrl: 'templates/dashboard.html',
      scope: {
        options: '='
      },
      controller: function($scope, Butler, $window) {

        $scope.configs = [];
        $scope.currentConfig = {};

        $scope.state = {
          editing: false
        };

        // Store UserId
        $scope.user_id = $window.sessionStorage._id;

        // Show Auth Container
        $scope.$on('USER_AUTHENTICATED', function() {
          $scope.getPreferences();
        });

        // Edit Config File
        $scope.editConfig = function(config){
          $scope.currentConfig =  config;
          $scope.state.editing = true;
        };

        /// Load user preferences
        $scope.getPreferences = function() {
          Butler.getPreferences()
            .then(function(res) {
              console.log(res.data);
              $scope.configs = res.data;
            }, function(err) {
              console.log(err);
            });
        };
      }
    };
  });
};
