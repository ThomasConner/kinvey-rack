'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Array$findIndex = require('babel-runtime/core-js/array/find-index')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _asciiTree = require('ascii-tree');

var _asciiTree2 = _interopRequireDefault(_asciiTree);

var isNumeric = function isNumeric(obj) {
  return !Array.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
};

var _execute = function _execute(index, middlewares, request) {
  var _this = this;

  if (index < -1 || index >= middlewares.length) {
    throw new Error('Index ' + index + ' is out of bounds.');
  }

  var middleware = middlewares[index];

  middleware.handle(request).then(function (response) {
    index = index + 1;

    if (index < middlewares.length) {
      return _execute.call(_this, index, middlewares, response);
    }

    return response;
  });
};

var Rack = (function () {
  function Rack() {
    var name = arguments[0] === void 0 ? 'Rack' : arguments[0];
    var middlewares = arguments[1] === void 0 ? [] : arguments[1];

    _classCallCheck(this, Rack);

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
      var index = arguments[0] === void 0 ? -1 : arguments[0];

      var middlewares = this.middlewares;

      if (!isNumeric(index)) {
        (function () {
          var instance = index;
          index = _Array$findIndex(middlewares, function (middleware) {
            return middleware instanceof instance;
          });
        })();
      }

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
    value: function useBefore(instance, middleware) {
      var middlewares = this.middlewares;
      var index = _Array$findIndex(middlewares, function (existingMiddleware) {
        return existingMiddleware instanceof instance;
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
      var index = _Array$findIndex(middlewares, function (existingMiddleware) {
        return existingMiddleware instanceof instance;
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
      var index = _Array$findIndex(middlewares, function (existingMiddleware) {
        return existingMiddleware instanceof instance;
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
      var index = _Array$findIndex(middlewares, function (existingMiddleware) {
        return existingMiddleware instanceof instance;
      });

      if (index > -1) {
        middlewares.splice(index, 1);
        this._middlewares = middlewares;
      }
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
    key: 'toString',
    value: function toString() {
      var level = arguments[0] === void 0 ? 0 : arguments[0];

      var middlewares = this.middlewares;
      var str = '';
      var i = 0;
      var len = 0;
      var middleware = undefined;

      for (i = 0; i <= level; i++) {
        str = '' + str + '#';
      }

      str = '' + str + 'this.name';

      for (i = 0, len = middlewares.length; i < len; i++) {
        middleware = middlewares[i];
        str = '' + str + '\n' + middleware.toString(level + 1);
      }

      if (level > 0) {
        return str;
      }

      try {
        return _asciiTree2['default'].generate(str);
      } catch (e) {
        return str;
      }
    }
  }]);

  return Rack;
})();

module.exports = Rack;