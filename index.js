var express = require('express');
var fs = require('fs');
var config = require('./config/');
var chalk = require('chalk');

var app = express();
app.config = config;

require('./config/express')(app);

module.exports = app