var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var karma = require('karma').server;
var browserify = require('browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var preprocess = require('gulp-preprocess');
var config = require('./config.json');

gulp.task('build', function() {
  return gulp.src(config.src)
    .pipe(babel())
    .pipe(gulp.dest(config.build));
});

gulp.task('prepare', function() {
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

gulp.task('default', function() {
  gulp.start('build');
});
