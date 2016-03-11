module.exports = function(app) {
  require('./ee.js')(app);
  require('./auth-interceptor.js')(app);
  require('./auth-service.js')(app);
  require('./butler-service.js')(app);
  require('./location-service.js')(app);
  require('./widget-service.js')(app);
};
