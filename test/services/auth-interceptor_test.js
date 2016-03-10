const angular = require('angular');

describe('Auth interceptor', () => {
  var $window, $location, authInterceptor;

  beforeEach(angular.mock.module('alfred'));
  beforeEach(angular.mock.inject(function(_$window_, _$location_, _authInterceptor_) {
    $window = _$window_;
    $location = _$location_;
    authInterceptor = _authInterceptor_;
  }));

  it('should be a service', () => {
    expect(typeof authInterceptor).toBe('object');
  });

  describe('methods', () => {
    beforeEach(() => {
      $window.sessionStorage.token = 'testtoken';
      $window.sessionStorage._id = 'testid';
    });

    afterEach(() => {
      if ($window.sessionStorage.token) delete $window.sessionStorage.token;
      if ($window.sessionStorage._id) delete $window.sessionStorage._id;
    });

    it('should be able to set token on request headers', () => {
      var testReq = { headers: {} };
      authInterceptor.request(testReq);

      expect(testReq.headers.token).toBe('testtoken');
    });

    it('should be able to handle unauthenticated user', () => {
      var testRes = { status: 401 };
      authInterceptor.response(testRes);

      expect($window.sessionStorage.token).toBe(undefined);
      expect($window.sessionStorage._id).toBe(undefined);
      expect($location.path()).toBe('/');
    });
  });
});
