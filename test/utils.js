let path = require('path');
const importDir = path.resolve(__dirname, './../src');

const utils = {
  importModule: (file) => {
    return require(path.normalize(importDir + '/' + file));
  }
};

export default utils;
