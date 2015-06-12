'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _asciiTree = require('./asciiTree');

var _asciiTree2 = _interopRequireDefault(_asciiTree);

var Middleware = (function () {
  function Middleware() {
    var name = arguments[0] === void 0 ? 'Middleware' : arguments[0];

    _classCallCheck(this, Middleware);

    this.name = name;
  }

  _createClass(Middleware, [{
    key: 'handle',
    value: function handle() {
      var request = arguments[0] === void 0 ? {} : arguments[0];

      return _Promise.resolve(request);
    }
  }, {
    key: 'generateTree',
    value: function generateTree() {
      var level = arguments[0] === void 0 ? 0 : arguments[0];

      var root = {
        value: this.name,
        level: level,
        nodes: []
      };
      return root;
    }
  }, {
    key: 'toString',
    value: function toString() {
      var root = this.generateTree(0);
      return _asciiTree2['default'].generate(root);
    }
  }]);

  return Middleware;
})();

exports['default'] = Middleware;
module.exports = exports['default'];