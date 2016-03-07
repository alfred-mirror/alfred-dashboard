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

        // Hide Auth Container
        $scope.show = false;

        // Store UserId
        $scope.user_id = $window.sessionStorage._id;

        // Show Auth Container
        $scope.$on('USER_AUTHENTICATED', function() {
          $scope.show = true;
          console.log('Emitted');
          $scope.getPreferences();
        });

        /// Load user preferences
        $scope.getPreferences = function() {
          Butler.getPreferences()
            .then(function(res) {
              $scope.preferences = res.data.preferences;
            }, function(err) {
              console.log(err);
            });
        }


      }
    }
  })
}