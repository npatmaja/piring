require('rootpath')();
var express = require('express');
var router = express.Router();

router
  .get('/:controller', function (req, res, next) {
    console.log('list users');
    routeToController(req.params.controller, 'list', req, res, next);
  })
  .get('/:controller/:id', function (req, res, next) {
    routeToController(req.params.controller, 'get', req, res, next);
  })
  .post('/:controller', function (req, res, next) {
    routeToController(req.params.controller, 'create', req, res, next);
  })
  .put('/:controller', function (req, res, next) {
    routeToController(req.params.controller, 'update', req, res, next);
  })
  .delete('/:controller', function (req, res, next) {
    routeToController(req.params.controller, 'delete', req, res, next);
  });

function routeToController (controllerName, methodName, req, res, next) {
  var controllerName = controllerName || 'list';
  var controller = null;
  
  try {
    controller = require('server/controllers/' + controllerName);
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

module.exports = router;