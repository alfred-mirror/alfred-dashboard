/* eslint-disable no-undef */

module.exports = function(app) {
  app.factory('Widget', ['$http', '$window',
    function($http, $window) {
      var baseURI = BASE_URI + '/widget/';
      return {
        widgets: [],
        getAllWidgets: function() {
          return $http.get(baseURI);
        },
        addWidget: function(widgetToAdd) {
          var URI = baseURI + 'new';
          return $http.post(URI, widgetToAdd);
        },
        editWidget: function(widgetToEdit) {
          var URI = baseURI + widgetToEdit._id;
          return $http.put(URI, widgetToEdit);
        },
        removeWidget: function(widgetToRemove) {
          var URI = baseURI + widgetToEdit._id;
          return $http.delete(URI);
        }
      };
    }
  ]);
};
