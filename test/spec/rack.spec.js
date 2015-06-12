import Rack from '../../src/rack';
import Middleware from '../../src/middleware';
import chai from 'chai';
let expect = chai.expect;

class CustomMiddleware extends Middleware {
  constructor() {
    super('Custom Middleware');
  }
}

describe('Rack', () => {
  let rack = new Rack();
  let middleware = new Middleware();

  before(() => {
    rack.use(middleware);
  });

  after(() => {
    rack.reset();
  });

  it('should be a class', () => {
    expect(Rack).to.be.a('Function');
  });

  describe('.prototype', () => {
    describe('.name', () => {
      it('should be named \'Rack\' by default', () => {
        expect(rack.name).to.equal('Rack');
      });
    });

    describe('.getMiddleware()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('getMiddleware');
      });

      it('should return middleware at the specified index', () => {
        let middlewareInstance = rack.getMiddleware(0);
        expect(middlewareInstance).to.be.an.instanceof(Middleware);
        expect(middlewareInstance).to.deep.equal(middleware);
      });

      it('should throw error for index out of bounds', () => {
        let index = 1;

        try {
          rack.getMiddleware(index);
        } catch (err) {
          expect(err).to.not.be.undefined;
          expect(err.message).to.equal(`Index ${index} is out of bounds.`);
        }
      });
    });

    describe('.use()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('use');
      });

      it('should add a middleware to the end of the rack', () => {
        let customMiddleware = new CustomMiddleware();
        rack.use(customMiddleware);
        let middlewares = rack.middlewares;
        let customMiddlewareInRack = rack.getMiddleware(1);

        expect(middlewares.length).to.equal(2);
        expect(customMiddlewareInRack).to.be.an.instanceof(CustomMiddleware);
        expect(customMiddlewareInRack).to.deep.equal(customMiddleware);

        // Remove the added middleware
        rack.remove(CustomMiddleware);
      });
    });

    describe('.useBefore()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('useBefore');
      });

      it('should add a middleware before an exisiting middleware', () => {
        let customMiddleware = new CustomMiddleware();
        rack.useBefore(Middleware, customMiddleware);
        let middlewares = rack.middlewares;
        let customMiddlewareInRack = rack.getMiddleware(0);

        expect(middlewares.length).to.equal(2);
        expect(customMiddlewareInRack).to.be.an.instanceof(CustomMiddleware);
        expect(customMiddlewareInRack).to.deep.equal(customMiddleware);

        // Remove the added middleware
        rack.remove(CustomMiddleware);
      });
    });

    describe('.useAfter()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('useAfter');
      });

      it('should add a middleware after an exisiting middleware', () => {
        let customMiddleware = new CustomMiddleware();
        rack.useAfter(Middleware, customMiddleware);
        let middlewares = rack.middlewares;
        let customMiddlewareInRack = rack.getMiddleware(1);

        expect(middlewares.length).to.equal(2);
        expect(customMiddlewareInRack).to.be.an.instanceof(CustomMiddleware);
        expect(customMiddlewareInRack).to.deep.equal(customMiddleware);

        // Remove the added middleware
        rack.remove(CustomMiddleware);
      });
    });

    describe('.swap()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('swap');
      });

      it('should swap an existing middleware with a middleware', () => {
        let customMiddleware = new CustomMiddleware();
        rack.swap(Middleware, customMiddleware);
        let middlewares = rack.middlewares;
        let customMiddlewareInRack = rack.getMiddleware(0);

        expect(middlewares.length).to.equal(1);
        expect(customMiddlewareInRack).to.be.an.instanceof(CustomMiddleware);
        expect(customMiddlewareInRack).to.deep.equal(customMiddleware);

        // Swap the custom middleware
        rack.swap(CustomMiddleware, middleware);
      });
    });

    describe('.remove()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('remove');
      });

      it('should remove a middleware', () => {
        rack.remove(Middleware);
        let middlewares = rack.middlewares;

        expect(middlewares.length).to.equal(0);

        // Use a middleware
        rack.use(middleware);
      });
    });

    describe('.reset()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('reset');
      });

      it('should remove all middleware', () => {
        rack.reset(Middleware);
        let middlewares = rack.middlewares;

        expect(middlewares.length).to.equal(0);

        // Use a middleware
        rack.use(middleware);
      });
    });

    describe('.execute()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('execute');
      });

      it('should return a Promise', () => {
        let request = {};
        let promise = rack.execute(request);

        expect(promise).to.be.an.instanceof(Promise);
      });
    });

    describe('.handle()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('handle');
      });

      it('should return a Promise', () => {
        let request = {};
        let promise = rack.execute(request);

        expect(promise).to.be.an.instanceof(Promise);
        // return promise.then((result) => {
        //   expect(result).to.deep.equal(request);
        // });
      });
    });

    describe('.toString()', () => {
      it('should respond', () => {
        expect(Rack.prototype).to.respondTo('toString');
      });

      it('should return a string', () => {
        let description = rack.toString();

        expect(typeof description).to.be.equal('string');
      });
    });
  });
});
