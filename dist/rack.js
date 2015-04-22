(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Rack = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var asciitree = require('ascii-tree');

var _execute = (function (_execute2) {
  function _execute(_x, _x2, _x3, _x4) {
    return _execute2.apply(this, arguments);
  }

  _execute.toString = function () {
    return _execute2.toString();
  };

  return _execute;
})(function (index, middlewares, request, response) {
  var _this = this;

  if (index < -1 || index >= middlewares.length) {
    throw new Error('Index ' + index + ' is out of bounds.');
  }

  var middleware = middlewares[index];
  return middleware.handle(request, response).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var request = _ref2[0];
    var response = _ref2[1];

    index += 1;

    if (index < middlewares.length) {
      return _execute.call(_this, index, middlewares, request, response);
    }

    return [request, response];
  });
});

var Rack = (function () {
  function Rack() {
    var name = arguments[0] === undefined ? 'Rack' : arguments[0];
    var middlewares = arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Rack);

    if (Array.isArray(name)) {
      middlewares = name;
      name = 'Rack';
    }

    if (!Array.isArray(middlewares)) {
      middlewares = [];
    }

    this.name = name;
    this._middlewares = middlewares;
  }

  _createClass(Rack, [{
    key: 'middlewares',
    get: function () {
      return this._middlewares.slice();
    }
  }, {
    key: 'getMiddleware',
    value: function getMiddleware() {
      var index = arguments[0] === undefined ? -1 : arguments[0];

      var middlewares = this.middlewares;

      if (!_.isNumber(index)) {
        var instance = index;
        index = Array.findIndex(middlewares, function (middleware) {
          return middleware instanceof instance;
        });
      }

      if (index < -1 || index >= middlewares.length) {
        throw new Error('Index ' + index + ' is out of bounds.');
      }

      return middlewares[index];
    }
  }, {
    key: 'use',
    value: function use(middleware) {
      if (middleware !== null && middleware !== undefined) {
        this._middlewares.push(middleware);
      }
    }
  }, {
    key: 'useBefore',
    value: function useBefore(instance, middleware) {
      var middlewares = this.middlewares;
      var index = Array.findIndex(middlewares, function (middleware) {
        return middleware instanceof instance;
      });

      if (index > -1) {
        middlewares.splice(index, 0, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'useAfter',
    value: function useAfter(instance, middleware) {
      var middlewares = this.middlewares;
      var index = Array.findIndex(middlewares, function (middleware) {
        return middleware instanceof instance;
      });

      if (index > -1) {
        middlewares.splice(index + 1, 0, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'swap',
    value: function swap(instance, middleware) {
      var middlewares = this.middlewares;
      var index = Array.findIndex(middlewares, function (middleware) {
        return middleware instanceof instance;
      });

      if (index > -1) {
        middlewares.splice(index, 1, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'remove',
    value: function remove(instance) {
      var middlewares = this.middlewares;
      var index = Array.findIndex(middlewares, function (middleware) {
        return middleware instanceof instance;
      });

      if (index > -1) {
        middlewares.splice(index, 1);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'execute',
    value: function execute(request) {
      var middlewares = this.middlewares;
      if (middlewares.length > 0) {
        return _execute.call(this, 0, middlewares, request);
      }
    }
  }, {
    key: 'handle',
    value: function handle(request) {
      return this.execute(request);
    }
  }, {
    key: 'toString',
    value: function toString() {
      var level = arguments[0] === undefined ? 0 : arguments[0];

      var middlewares = this.middlewares;
      var str = '';
      var i, len;
      var middleware;

      for (i = 0; i <= level; i++) {
        str += '#';
      }

      str += this.name;

      for (i = 0, len = middlewares.length; i < len; i++) {
        middleware = middlewares[i];
        str += '\n' + middleware.toString(level + 1);
      }

      if (level > 0) {
        return str;
      }

      try {
        return asciitree.generate(str);
      } catch (e) {
        return str;
      }
    }
  }]);

  return Rack;
})();

module.exports = Rack;
},{"ascii-tree":2}],2:[function(require,module,exports){
var levels = [];
var freetree = require('freetree');
var c0 = String.fromCharCode(9500);
var c1 = String.fromCharCode(9472);
var c2 = String.fromCharCode(9492);
var c3 = String.fromCharCode(9474); 

function generate(str) {
    var tree = freetree.parse(str);
    return _generate(tree, true);
}

function compose(tree, end) {
    var i, ret = '\r\n';
    var c = end ? c2: c0;

    if (tree.level == 0) {
        return tree.value;
    }

    for (i = 1; i < tree.level; ++i) {
        ret += levels[i] ? ' ' : c3
        ret += '  ';
    }

    return ret + c + c1 + ' ' + tree.value;
}

function _generate(tree, end) {
    var last;
    var result = compose(tree, end);

    if (tree.nodes) {
        last = tree.nodes.length - 1;
        tree.nodes.forEach(function(subTree, index) {
            levels[subTree.level] = index == last;
            result +=  _generate(subTree, index == last);
        });
    }

    return result;
}

exports.generate = generate;

},{"freetree":3}],3:[function(require,module,exports){
var _settings = {
    leadingChar: '#'
};

function parse(str, settings) {
    config(settings);
    var lines = split(str);
    check(lines);
    return build(lines);
}

function config(settings) {
    var key, val;
    if (!settings) {
	return;
    }

    for (key in _settings) {
	val = settings[key];
	if (val) {
	    _settings[key] = val;
	}
    }
}

function split(str) {
    var lines = str.split(/[\r\n]+/);

    return lines.filter(function(line) {
	return line.trim() != '';
    });
}

function check(str) {
    checkRoot(str);
}

function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function checkRoot(lines) {
    var c = escapeRegExp(_settings.leadingChar),
	firstTwoPattern = new RegExp('^' + c + '[^' + c + ']');
	pattern = new RegExp('^' + c + '[^' + c + '].*$'),
	roots = lines.filter(function(line) {
	    return pattern.test(line);
	});
    
    if (roots.length > 1) {
	throw new Error('Only single root node is allowed!');
    }

    if (!firstTwoPattern.test(lines[0])) {
	throw new Error('The root node should be the first node!');
    }    
}

function parseLine(line) {
    var c = escapeRegExp(_settings.leadingChar),
	pattern = new RegExp('^(' + c + '+)' + '(.+)$'),
	matches = line.match(pattern);

    return {
	level: matches[1].length - 1,
	value: matches[2]
    }
}	

function build(lines) {
    var i, 
	node,
	root = {},
	stack = [],
	len = lines.length;

    for (i = 0; i < len; ++i) {
	node = parseLine(lines[i]);

	if (stack.length == 0) {
	    root = node;
            stack.unshift(root);
	    continue;
	}

	while(stack[0].level >= node.level) {
            stack.shift();
	}

	if (!stack[0].nodes) {
	    stack[0].nodes = [];
	}

	stack[0].nodes.push(node);
	stack.unshift(node);
    }

    return root;
}

exports.parse = parse;

},{}]},{},[1])(1)
});