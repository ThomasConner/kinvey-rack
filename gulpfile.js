var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var karma = require('karma').server;
var browserify = require('browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var config = require('./config.json');

gulp.task('build', function(done) {
  runSequence('build:clean', 'transpile', done);
});

gulp.task('build:clean', function() {
    return gulp.src(config.build)
      .pipe(clean());
});

gulp.task('transpile', function() {
  return gulp.src(config.src)
    .pipe(babel())
    .pipe(gulp.dest(config.build));
});

gulp.task('dist', function(done) {
  runSequence(['build', 'dist:clean'], 'browserify', 'compress', done);
});

gulp.task('dist:clean', function() {
    return gulp.src(config.dist)
      .pipe(clean());
});

gulp.task('browserify', function() {
  return browserify(config.browserify).bundle()
    .pipe(source(config.browserify.outputName))
    .pipe(gulp.dest(config.dist));
});

gulp.task('compress', function() {
  return gulp.src(config.dist + '/' + config.browserify.outputName)
    .pipe(uglify())
    .pipe(rename(config.releaseName))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + config.test.karmaConfig,
    singleRun: true
  }, done);
});

gulp.task('release', function(done) {
  runSequence('dist', done);
});

gulp.task('default', function(done) {
  runSequence('build', done);
});
