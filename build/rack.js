'use strict';

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _ = require('lodash');
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
    var middlewares = arguments[1] === undefined ? new Array() : arguments[1];

    _classCallCheck(this, Rack);

    if (_.isArray(name)) {
      middlewares = name;
      name = 'Rack';
    }

    if (_.isUndefined(middlewares) || _.isNull(middlewares)) {
      middlewares = new Array();
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
        index = _.findIndex(middlewares, function (middleware) {
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
      if (!_.isNull(middleware) && !_.isUndefined(middleware)) {
        this._middlewares.push(middleware);
      }
    }
  }, {
    key: 'useBefore',
    value: function useBefore(instance, middleware) {
      var middlewares = this.middlewares;
      var index = _.findIndex(middlewares, function (middleware) {
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
      var index = _.findIndex(middlewares, function (middleware) {
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
      var index = _.findIndex(middlewares, function (middleware) {
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
      var index = _.findIndex(middlewares, function (middleware) {
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

      for (var i = 0; i <= level; i++) {
        str += '#';
      }

      str += this.name;

      for (var i = 0, len = middlewares.length; i < len; i++) {
        var middleware = middlewares[i];
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