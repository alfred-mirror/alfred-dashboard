module.exports = function(app) {
  app.directive('user', function() {
    return {
      restrict: 'AEC',
      templateUrl: 'templates/user.html',
      replace: true,
      controller: function($scope, Butler, $interval) {

        // User object
        $scope.user = {
          name: {
            first: "",
            last: "",
          }
        };

        // Get User
        $scope.getUser = function() {
          Butler.getUser().then(function(res) {
            $scope.user = res.data;
          });
        }

        // Update User
        $scope.updateUser = function() {
          Butler.updateUser($scope.user)
            .then(function(res) {
              console.log(res);
            });
        }
      }
    }
  });
}