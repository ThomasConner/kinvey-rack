'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var levels = [];
var c0 = String.fromCharCode(9500);
var c1 = String.fromCharCode(9472);
var c2 = String.fromCharCode(9492);
var c3 = String.fromCharCode(9474);

var AsciiTree = (function () {
  function AsciiTree() {
    _classCallCheck(this, AsciiTree);
  }

  _createClass(AsciiTree, [{
    key: 'generate',
    value: function generate() {
      var _this = this;

      var tree = arguments[0] === void 0 ? {} : arguments[0];
      var end = arguments[1] === void 0 ? true : arguments[1];

      var result = this.compose(tree, end);

      if (tree.nodes.length > 0) {
        (function () {
          var last = tree.nodes.length - 1;
          tree.nodes.forEach(function (subTree, index) {
            levels[subTree.level] = index === last;
            result = result + _this.generate(subTree, index === last);
          });
        })();
      }

      return result;
    }
  }, {
    key: 'compose',
    value: function compose() {
      var node = arguments[0] === void 0 ? {} : arguments[0];
      var end = arguments[1] === void 0 ? true : arguments[1];

      if (node.level === 0) {
        return node.value;
      }

      var ret = '\r\n';
      var c = end ? c2 : c0;

      for (var i = 1; i < node.level; i++) {
        ret = '' + ret + '' + (levels[i] ? ' ' : c3);
        ret = '' + ret + '  ';
      }

      return '' + ret + '' + c + '' + c1 + ' ' + node.value;
    }
  }], [{
    key: 'generate',
    value: function generate() {
      var node = arguments[0] === void 0 ? {} : arguments[0];

      var asciiTree = new AsciiTree();
      return asciiTree.generate(node);
    }
  }]);

  return AsciiTree;
})();

exports['default'] = AsciiTree;
module.exports = exports['default'];