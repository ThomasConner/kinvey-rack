require('babel/polyfill');
import asciitree from 'ascii-tree';

let isNumeric = function (obj) {
  return !Array.isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
};

let execute = async function (index, middlewares, request, response) {
  if (index < -1 || index >= middlewares.length) {
    throw new Error(`Index ${index} is out of bounds.`);
  }

  let middleware = middlewares[index];
  let result = await middleware.handle(request, response);

  index = index + 1;

  if (index < middlewares.length) {
    await execute.call(this, index, middlewares, result[0], result[1]);
  }

  return result;
};

class Rack {
  constructor(name = 'Rack', middlewares = []) {
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

  get middlewares() {
    return this._middlewares.slice();
  }

  getMiddleware(index = -1) {
    let middlewares = this.middlewares;

    if (!isNumeric(index)) {
      let instance = index;
      index = Array.findIndex(middlewares, function (middleware) {
        return (middleware instanceof instance);
      });
    }

    if (index < -1 || index >= middlewares.length) {
      throw new Error(`Index ${index} is out of bounds.`);
    }

    return middlewares[index];
  }

  use(middleware) {
    if (middleware !== null && middleware !== undefined) {
      this._middlewares.push(middleware);
    }
  }

  useBefore(instance, middleware) {
    let middlewares = this.middlewares;
    let index = Array.findIndex(middlewares, function (existingMiddleware) {
      return (existingMiddleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 0, middleware);
      this._middlewares = middlewares;
    }
  }

  useAfter(instance, middleware) {
    let middlewares = this.middlewares;
    let index = Array.findIndex(middlewares, function (existingMiddleware) {
      return (existingMiddleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index + 1, 0, middleware);
      this._middlewares = middlewares;
    }
  }

  swap(instance, middleware) {
    let middlewares = this.middlewares;
    let index = Array.findIndex(middlewares, function (existingMiddleware) {
      return (existingMiddleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 1, middleware);
      this._middlewares = middlewares;
    }
  }

  remove(instance) {
    let middlewares = this.middlewares;
    let index = Array.findIndex(middlewares, function (existingMiddleware) {
      return (existingMiddleware instanceof instance);
    });

    if (index > -1) {
      middlewares.splice(index, 1);
      this._middlewares = middlewares;
    }
  }

  execute(request) {
    let middlewares = this.middlewares;
    if (middlewares.length > 0) {
      return execute.call(this, 0, middlewares, request);
    }
  }

  handle(request) {
    return this.execute(request);
  }

  toString(level = 0) {
    let middlewares = this.middlewares;
    let str = '';
    let i = 0;
    let len = 0;
    let middleware;

    for (i = 0; i <= level; i++) {
      str = `${str}#`;
    }

    str = `${str}this.name`;

    for (i = 0, len = middlewares.length; i < len; i++) {
      middleware = middlewares[i];
      str = `${str}\n${middleware.toString(level + 1)}`;
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
