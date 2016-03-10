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
<<<<<<< HEAD
<<<<<<< a4cf901eda87a9101e3783a00718ca0f13ec54c8
        expect(typeof location.latitude).toBe('number');
        expect(typeof location.longitude).toBe('number');
=======
        expect(location.latitude).toBe('number');
        expect(location.longitude).toBe('number');
>>>>>>> Added tests
=======
        expect(location.latitude).toBe('number');
        expect(location.longitude).toBe('number');
>>>>>>> 16f343fcdcd95a0dcacd8b15c4b4dce229db297e
        called = true;
        done();
      });
  });
});
