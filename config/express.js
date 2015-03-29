require('rootpath')();
var bodyParser = require('body-parser');
var path = require('path');
var package = require('package.json');

module.exports = function configureExpress (app) {
  var root = app.config.root;
  app.set('view engine', 'jade');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(app.express.static(path.join(root, 'public')));
  delete app.express;

  // Adds additional info in the rendering 
  app.use(function (req, res, next) {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    res.locals.package = package;
    next();
  });

  // Use api router when an API request is received
  var apiBaseUrl = '/api/' + app.config.apiVersion + '/';
  app.use(apiBaseUrl, require('routes/api'));
  
  // Use web router for non API request
  app.use(require('routes/web'));
}