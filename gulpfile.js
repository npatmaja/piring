var gulp = require('gulp');
var rename = require('gulp-rename');

var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var jshint = require('gulp-jshint');

var mochaPhantomjs = require('gulp-mocha-phantomjs');
var mocha = require('gulp-mocha');

var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var exit = require('gulp-exit');

var NpmImportPlugin = require("less-plugin-npm-import");
var options = { plugins: [new NpmImportPlugin({prefix: '~'})] };

gulp.task('lint-client', function () {
  return gulp.src('client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function () {
  return gulp.src('test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('test-client', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs());
});

gulp.task('test-server', ['lint-test'], function () {
  return gulp.src('test/server/**/*.js', { read: false })
    .pipe(mocha({ 
      reporter: 'spec',
      ui: 'bdd',
      growl: true,
      timeout: 2000,
      useColors: true 
    }))
    .pipe(exit());
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.less', ['styles']);
  gulp.watch('client/**/*.js', ['browserify-client']);
  gulp.watch('test/client/**/*.js', ['browserify-test']);
});

gulp.task('styles', function() {
  return gulp.src('client/less/index.less')
    .pipe(less(options))
    .pipe(prefix({ cascade: true }))
    .pipe(rename('app.css'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/app.css')
    .pipe(minifyCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('public/javascripts'));
});

gulp.task('run', function () {
  nodemon({
    verbose: true,
    script: 'server.js',
    ext: 'js',
    watch: [
      'server', 
      'index.js', 
      'server.js', 
      'config', 
      'gulpfile.js', 
      'package.json', 
      'routes', 
      'views'],
    env: {
      'NODE_ENV': 'development'
    }
  });
})

gulp.task('build', ['uglify', 'minify']);

gulp.task('test', function () {
  runSequence('test-client', 'test-server');
});

gulp.task('default', function () {
  runSequence('build', 'watch', 'run');
});