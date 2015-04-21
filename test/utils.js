var path = require('path');
const importDir = path.normalize(__dirname + './../src');

const utils = {
  importModule: function(file) {
    return require(path.normalize(importDir + '/' + file));
  }
};

export default utils;
