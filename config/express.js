var bodyParser = require('body-parser');
var path = require('path');

module.exports = function configureExpress (app) {
  var root = app.config.root;
  app.set('views', root + '/views');
  app.set('view engine', 'jade');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(app.express.static(path.join(root, 'public')));
  delete app.express;

  var apiBaseUrl = '/api/' + app.config.apiVersion + '/';
  var apiRouter = root + '/routes/api';
  app.use(apiBaseUrl, require(apiRouter));
}