module.exports = function(app) {
  require('./ee.js')(app);
  require('./auth-interceptor.js')(app);
  require('./auth-service.js')(app);
  require('./butler-service.js')(app);
};
