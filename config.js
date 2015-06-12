/*eslint-disable*/

var path = require('path');
var fs = require('fs');
var src = path.join(__dirname, 'src/**/*.js');
var build = path.join(__dirname, 'build');
var entry = path.join(build, 'export.js');
var dist = path.join(__dirname, 'dist');
var test = path.join(__dirname, 'test');
var karmaConfig = path.join(test, 'karma.conf.js');

module.exports = {
  build: build,
  babel: {
    comments: false,
    optional: [
      'runtime',
      'spec.undefinedToVoid'
    ],
    stage: 2
  },
  browserify: {
    entries: entry,
    dest: dist,
    noParse: [],
    outputName: 'rack.js',
    standalone: 'Rack',
    transform: [
      'browserify-shim'
    ]
  },
  dist: dist,
  releaseName: 'rack.min.js',
  preprocess: {
    context: {}
  },
  src: [
    src
  ],
  test: {
    karmaConfig: karmaConfig
  }
};
