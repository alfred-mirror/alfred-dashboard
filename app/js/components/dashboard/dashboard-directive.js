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
        // Store UserId
        $scope.user_id = $window.sessionStorage._id;

        // Show Auth Container
        $scope.$on('USER_AUTHENTICATED', function() {
          $scope.getPreferences();
        });

        /// Load user preferences
        $scope.getPreferences = function() {
          Butler.getPreferences()
            .then(function(res) {
              console.log(res.data);
              $scope.preferences = res.data;
            }, function(err) {
              console.log(err);
            });
        }
      }
    }
  })
}