var _ = require('lodash');
var asciitree = require('ascii-tree');

var _execute = function(index, middlewares, request, response) {
  if (index < -1 || index >= middlewares.length) {
    throw new Error(`Index ${index} is out of bounds.`);
  }

  var middleware = middlewares[index];
  return middleware.handle(request, response).then(([request, response]) => {
    index += 1;

    if (index < middlewares.length) {
      return _execute.call(this, index, middlewares, request, response);
    }

    return [request, response];
  });
};

class Rack {
  constructor(name = 'Rack', middlewares = []) {
    if (_.isArray(name)) {
      middlewares = name;
      name = 'Rack';
    }

    if (_.isUndefined(middlewares) || _.isNull(middlewares)) {
      middlewares = [];
    }

    this.name = name;
    this._middlewares = middlewares;
  }

  get middlewares() {
    return this._middlewares.slice();
  }

  getMiddleware(index = -1) {
    var middlewares = this.middlewares;

    if (!_.isNumber(index)) {
      var instance = index;
      index = _.findIndex(middlewares, function(middleware) {
        return (middleware instanceof instance);
      });
    }

    if (index < -1 || index >= middlewares.length) {
      throw new Error(`Index ${index} is out of bounds.`);
    }

    return middlewares[index];
  }

  use(middleware) {
    if (!_.isNull(middleware) && !_.isUndefined(middleware)) {
      this._middlewares.push(middleware);
    }
  }

  useBefore(instance, middleware) {
    var middlewares = this.middlewares;
    var index = _.findIndex(middlewares, function(middleware) {
      return (middleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 0, middleware);
      this._middlewares = middlewares;
    }
  }

  useAfter(instance, middleware) {
    var middlewares = this.middlewares;
    var index = _.findIndex(middlewares, function(middleware) {
      return (middleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index + 1, 0, middleware);
      this._middlewares = middlewares;
    }
  }

  swap(instance, middleware) {
    var middlewares = this.middlewares;
    var index = _.findIndex(middlewares, function(middleware) {
      return (middleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 1, middleware);
      this._middlewares = middlewares;
    }
  }

  remove(instance) {
    var middlewares = this.middlewares;
    var index = _.findIndex(middlewares, function(middleware) {
      return (middleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 1);
      this._middlewares = middlewares;
    }
  }

  execute(request) {
    var middlewares = this.middlewares;
    if (middlewares.length > 0) {
      return _execute.call(this, 0, middlewares, request);
    }
  }

  handle(request) {
    return this.execute(request);
  }

  toString(level = 0) {
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
      str += `\n${middleware.toString(level + 1)}`;
    }

    if (level > 0) {
      return str;
    }

    try {
      return asciitree.generate(str);
    } catch(e) {
      return str;
    }
  }
}

module.exports = Rack;
