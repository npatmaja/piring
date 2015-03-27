require('rootpath')();
var express = require('express');
var fs = require('fs');
var config = require('config/');
var chalk = require('chalk');

var app = express();
app.config = config;
app.express = express;

require('config/express')(app);

module.exports = app