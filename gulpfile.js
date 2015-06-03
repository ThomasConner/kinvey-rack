/*eslint-disable*/

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var babel = require('gulp-babel');
var karma = require('karma').server;
var browserify = require('browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var config = require('./config');
var eslint = require('gulp-eslint');
var path = require('path');

gulp.task('lint', function () {
  return gulp.src(config.src)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('build', function (done) {
  runSequence('build:clean', 'lint', 'transpile', done);
});

gulp.task('build:clean', function (done) {
  del([config.build], done);
});

gulp.task('transpile', function () {
  return gulp.src(config.src)
    .pipe(babel(config.babel))
    .pipe(gulp.dest(config.build));
});

gulp.task('dist', function (done) {
  runSequence(['build', 'dist:clean'], 'browserify', 'compress', done);
});

gulp.task('dist:clean', function (done) {
  del([config.dist], done);
});

gulp.task('browserify', function () {
  return browserify(config.browserify).bundle()
    .pipe(source(config.browserify.outputName))
    .pipe(gulp.dest(config.dist));
});

gulp.task('compress', function () {
  return gulp.src(config.dist + '/' + config.browserify.outputName)
    .pipe(uglify())
    .pipe(rename(config.releaseName))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: path.join(__dirname, config.test.karmaConfig),
    singleRun: true
  }, done);
});

gulp.task('release', function (done) {
  runSequence('dist', done);
});

gulp.task('default', function (done) {
  runSequence('build', done);
});
