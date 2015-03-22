require('rootpath')();
var chalk = require('chalk');
var app = require('index');

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || app.config.port;
var errorMessage = '\n' + chalk.red('Error while running server');
var runMessage = '\n' + chalk.green('App listening on port ') 
      + chalk.underline.green(port)
      + chalk.green(' in ')
      + chalk.underline.green(env)
      + chalk.green(' environment'); 

app.listen(port, function () {
  if (env != 'production') {
    console.log(runMessage);
  }
}).on('error', function (err) {
  console.error(errorMessage, chalk.bgRed(err));
});