var validator = require('validator');
var root = '';

module.exports = function routeRequest (app) {
  root = app.config.root;

  app.get(':controller', function (req, res, next) {
    routeToController(req.params.controller, 'list', req, res, next);
  });

  app.get(':controller/:id', function (req, res, next) {
    routeToController(req.params.controller, 'get', req, res, next);
  });

  app.post(':controller', function (req, res, next) {
    routeToController(req.params.controller, 'create', req, res, next);
  });

  app.put(':controller', function (req, res, next) {
    routeToController(req.params.controller, 'update', req, res, next);
  });

  app.delete(':controller', function (req, res, next) {
    routeToController(req.params.controller, 'delete', req, res, next);
  });
}

function routeToController (controllerName, methodName, req, res, next) {
  var controllerName = controllerName || 'list';
  var controller = null;
  var controllerDir = root + 'server/controllers/'
  
  try {
    controller = require(controllerDir + controllerName);
  } catch (e) {
    console.warn("controller not found: " + controllerName, e);
    next();
    return;
  }

  if (typeof(controller[methodName]) === 'function') {
    controller[methodName](req, res, next);
  } else {
    console.warn("method nof found: ", methodName);
    next();
  }
}
