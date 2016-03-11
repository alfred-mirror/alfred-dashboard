const angular = require('angular');

describe('Location service', () => {
  var $httpBackend, GeoLocation;

  beforeEach(angular.mock.module('alfred'));
  beforeEach(angular.mock.inject(function(_$httpBackend_, _GeoLocation_) {
    $httpBackend = _$httpBackend_;
    GeoLocation = _GeoLocation_;
  }));

  it('should be a service', () => {
    expect(typeof GeoLocation).toBe('object');
  });

  it('#getLocation()', (done) => {
    var called = false;

    GeoLocation.getLocation()
      .then(function(location) {
        expect(typeof location).toBe('object');
        expect(typeof location.latitude).toBe('number');
        expect(typeof location.longitude).toBe('number');
        called = true;
        done();
      });
  });
});
