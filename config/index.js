var path = require('path');
var util = require('util');

var ROOT_PATH = path.normalize(__dirname + '/..');
var API_VERSION = 'v1';

var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + util.format('/%s-config.js', env))(ROOT_PATH, API_VERSION);

config.NODE_ENV = env;

module.exports = config;