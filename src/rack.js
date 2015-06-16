import Middleware from './middleware';

let execute = function (index, middlewares, request) {
  // Throw error of an index that is out of bounds
  if (index < -1 || index >= middlewares.length) {
    throw new Error(`Index ${index} is out of bounds.`);
  }

  // Get the middleware at index
  let middleware = middlewares[index];

  // Process the request on the middleware
  return middleware.handle(request).then((response) => {
    // Add 1 to the index
    index = index + 1;

    // Execute the next middleware in the stack
    if (index < middlewares.length) {
      return execute.call(this, index, middlewares, response);
    }

    return response;
  });
};

class Rack extends Middleware {
  constructor(name = 'Rack') {
    super(name);
    this._middlewares = [];
  }

  get middlewares() {
    return this._middlewares.slice();
  }

  getMiddleware(index = -1) {
    let middlewares = this.middlewares;

    if (index < -1 || index >= middlewares.length) {
      throw new Error(`Index ${index} is out of bounds.`);
    }

    return middlewares[index];
  }

  use(middleware) {
    if (middleware !== null && middleware !== undefined) {
      if (middleware instanceof Middleware) {
        this._middlewares.push(middleware);
        return;
      }

      throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
    }
  }

  useBefore(middlewareClass, middleware) {
    if (middleware !== null && middleware !== undefined) {
      if (middleware instanceof Middleware) {
        let middlewares = this.middlewares;
        let index = middlewares.findIndex(existingMiddleware => existingMiddleware instanceof middlewareClass);

        if (index > -1) {
          middlewares.splice(index, 0, middleware);
          this._middlewares = middlewares;
        }

        return;
      }

      throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
    }
  }

  useAfter(middlewareClass, middleware) {
    if (middleware !== null && middleware !== undefined) {
      if (middleware instanceof Middleware) {
        let middlewares = this.middlewares;
        let index = middlewares.findIndex(existingMiddleware => existingMiddleware instanceof middlewareClass);

        if (index > -1) {
          middlewares.splice(index + 1, 0, middleware);
          this._middlewares = middlewares;
        }

        return;
      }

      throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
    }
  }

  swap(middlewareClass, middleware) {
    if (middleware !== null && middleware !== undefined) {
      if (middleware instanceof Middleware) {
        let middlewares = this.middlewares;
        let index = middlewares.findIndex(existingMiddleware => existingMiddleware instanceof middlewareClass);

        if (index > -1) {
          middlewares.splice(index, 1, middleware);
          this._middlewares = middlewares;
        }

        return;
      }

      throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
    }
  }

  remove(middlewareClass) {
    let middlewares = this.middlewares;
    let index = middlewares.findIndex(existingMiddleware => existingMiddleware instanceof middlewareClass);

    if (index > -1) {
      middlewares.splice(index, 1);
      this._middlewares = middlewares;
      this.remove(middlewareClass);
    }
  }

  reset() {
    this._middlewares = [];
  }

  execute(request) {
    return execute.call(this, 0, this.middlewares, request);
  }

  handle(request) {
    return this.execute(request);
  }

  generateTree(level = 0) {
    let root = super.generateTree(level);
    let middlewares = this.middlewares;

    middlewares.forEach((middleware) => {
      root.nodes.push(middleware.generateTree(level + 1));
    });

    return root;
  }
}

export default Rack;
