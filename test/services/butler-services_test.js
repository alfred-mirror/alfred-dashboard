const angular = require('angular');
const baseURI = require(__dirname + '/../../.env').BASE_URI;

describe('Butler services', () => {
  var $httpBackend, $window, Butler;

  beforeEach(angular.mock.module('alfred'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _Butler_) {
    $httpBackend = _$httpBackend_;
    Butler = _Butler_;
  }));

  it('should be a service', () => {
    expect(typeof Butler).toBe('object');
  });

  describe('individual methods', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('#getConfig()', () => {
      $httpBackend.expectGET(baseURI + '/dashboard/config')
        .respond(200, { msg: 'success' });

      var called = false;
      Butler.getConfig()
        .then((res) => {
          expect(res.data.msg).toBe('success');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('#updateConfig()', () => {
      var configData = {
        _id: 5,
        modules: [{ type: 'greeting' }]
      };

      $httpBackend.expectPUT(baseURI + '/dashboard/config/5', configData)
        .respond(200, { msg: 'success' });

      var called = false;
      Butler.updateConfig(configData)
        .then((res) => {
          expect(res.data.msg).toBe('success');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });

    it('#setConfig()', () => {
      var configData = {
        _id: 5,
        modules: [{ type: 'greeting' }]
      };

      $httpBackend.expectPOST(baseURI + '/dashboard/config/setConfig/5')
        .respond(200, { msg: 'success' });

      var called = false;
      Butler.setConfig(configData)
        .then((res) => {
          expect(res.data.msg).toBe('success');
          called = true;
        });

      $httpBackend.flush();
      expect(called).toBe(true);
    });
  });
});
