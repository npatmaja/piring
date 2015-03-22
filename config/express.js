var bodyParser = require('body-parser');

module.exports = function configureExpress (app) {
  var root = app.config.root;
  app.set('views', root + '/views');
  app.set('view engine', 'jade');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  var apiBaseUrl = '/api/' + app.config.apiVersion + '/';
  var apiRouter = root + '/routes/api';
  app.use(apiBaseUrl, require(apiRouter));
}