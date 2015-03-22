var PORT = 7890;
var HOST = 'http://localhost';

module.exports = function (rootPath, apiVersion) {
  var config = {
    port: PORT,
    baseUrl: HOST + ':' + PORT + '/' + 'api/' + apiVersion + '/',
    db: 'mongodb://localhost/piring',
    root: rootPath,
    apiVersion: apiVersion,
    redis: {
      host: '127.0.0.1',
      port: 6379,
      options: {}
    }
  };

  return config;
}