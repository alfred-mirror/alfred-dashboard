const angular = require('angular');
const baseURI = require(__dirname + '/../../.env').BASE_URI;

describe('Auth services', () => {
  var $httpBackend, $window, $location, AuthFactory;

  beforeEach(angular.mock.module('alfred'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _$window_, _$location_, _AuthFactory_) {
    $httpBackend = _$httpBackend_;
    $window = _$window_;
    $location = _$location_;
    AuthFactory = _AuthFactory_;
  }));

  it('should be a service', () => {
    expect(typeof AuthFactory).toBe('object');
  });

  describe('individual methods', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('#login()', () => {
      $httpBackend.expectGET(
        baseURI + '/auth/login',
        (headers) => headers.authorization === 'Basic ' + btoa('test@moretests.com:password')
      ).respond(200, { msg: 'success' });

      var called = false;
      AuthFactory.login({email: 'test@moretests.com', password: 'password'})
        .then((res) => {
          expect(res.data.msg).toBe('success');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('#register()', () => {
      var authData = { email: 'test@moretests.com', password: 'password' };

      $httpBackend.expectPOST(
        baseURI + '/auth/register',
        { authentication: authData }
      ).respond(200, { msg: 'success' });

      var called = false;
      AuthFactory.register(authData)
        .then((res) => {
          expect(res.data.msg).toBe('success');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('#logout()', () => {
      $window.sessionStorage.token = 'testtoken';
      $window.sessionStorage._id = 'testid';
      AuthFactory.logout();

      expect($window.sessionStorage.token).toBe(undefined);
      expect($window.sessionStorage._id).toBe(undefined);
      expect($location.path()).toBe('/');
    });
  });
});
