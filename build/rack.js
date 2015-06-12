'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _execute = function _execute(index, middlewares, request) {
  var _this = this;

  if (index < -1 || index >= middlewares.length) {
    throw new Error('Index ' + index + ' is out of bounds.');
  }

  var middleware = middlewares[index];

  return middleware.handle(request).then(function (response) {
    index = index + 1;

    if (index < middlewares.length) {
      return _execute.call(_this, index, middlewares, response);
    }

    return response;
  });
};

var Rack = (function (_Middleware) {
  function Rack() {
    var name = arguments[0] === void 0 ? 'Rack' : arguments[0];

    _classCallCheck(this, Rack);

    _get(Object.getPrototypeOf(Rack.prototype), 'constructor', this).call(this, name);
    this._middlewares = [];
  }

  _inherits(Rack, _Middleware);

  _createClass(Rack, [{
    key: 'getMiddleware',
    value: function getMiddleware() {
      var index = arguments[0] === void 0 ? -1 : arguments[0];

      var middlewares = this.middlewares;

      if (index < -1 || index >= middlewares.length) {
        throw new Error('Index ' + index + ' is out of bounds.');
      }

      return middlewares[index];
    }
  }, {
    key: 'use',
    value: function use(middleware) {
      if (middleware !== null && middleware !== void 0) {
        this._middlewares.push(middleware);
      }
    }
  }, {
    key: 'useBefore',
    value: function useBefore(middlewareClass, middleware) {
      var middlewares = this.middlewares;
      var index = middlewares.findIndex(function (existingMiddleware) {
        return existingMiddleware instanceof middlewareClass;
      });

      if (index > -1) {
        middlewares.splice(index, 0, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'useAfter',
    value: function useAfter(middlewareClass, middleware) {
      var middlewares = this.middlewares;
      var index = middlewares.findIndex(function (existingMiddleware) {
        return existingMiddleware instanceof middlewareClass;
      });

      if (index > -1) {
        middlewares.splice(index + 1, 0, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'swap',
    value: function swap(middlewareClass, middleware) {
      var middlewares = this.middlewares;
      var index = middlewares.findIndex(function (existingMiddleware) {
        return existingMiddleware instanceof middlewareClass;
      });

      if (index > -1) {
        middlewares.splice(index, 1, middleware);
        this._middlewares = middlewares;
      }
    }
  }, {
    key: 'remove',
    value: function remove(middlewareClass) {
      var middlewares = this.middlewares;
      var index = middlewares.findIndex(function (existingMiddleware) {
        return existingMiddleware instanceof middlewareClass;
      });

      if (index > -1) {
        middlewares.splice(index, 1);
        this._middlewares = middlewares;
        this.remove(middlewareClass);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._middlewares = [];
    }
  }, {
    key: 'execute',
    value: function execute(request) {
      return _execute.call(this, 0, this.middlewares, request);
    }
  }, {
    key: 'handle',
    value: function handle(request) {
      return this.execute(request);
    }
  }, {
    key: 'generateTree',
    value: function generateTree() {
      var level = arguments[0] === void 0 ? 0 : arguments[0];

      var root = _get(Object.getPrototypeOf(Rack.prototype), 'generateTree', this).call(this, level);
      var middlewares = this.middlewares;

      middlewares.forEach(function (middleware) {
        root.nodes.push(middleware.generateTree(level + 1));
      });

      return root;
    }
  }, {
    key: 'middlewares',
    get: function () {
      return this._middlewares.slice();
    }
  }]);

  return Rack;
})(_middleware2['default']);

exports['default'] = Rack;
module.exports = exports['default'];