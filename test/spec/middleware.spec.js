import Middleware from '../../src/middleware';
import chai from 'chai';
let expect = chai.expect;

describe('Middleware', () => {
  let middleware = new Middleware();

  it('should be a class', () => {
    expect(Middleware).to.be.a('Function');
  });

  describe('.prototype', () => {
    describe('.name', () => {
      it('should be named \'Middleware\' by default', () => {
        expect(middleware.name).to.equal('Middleware');
      });
    });

    describe('.handle()', () => {
      it('should respond', () => {
        expect(Middleware).to.respondTo('handle');
      });

      it('should return a Promise that is resolved', () => {
        let request = {};
        let promise = middleware.handle(request);

        expect(promise).to.be.an.instanceof(Promise);
        return promise.then((result) => {
          expect(result).to.deep.equal(request);
        });
      });
    });

    describe('.toString()', () => {
      it('should respond', () => {
        expect(Middleware).to.respondTo('toString');
      });

      it('should return a string', () => {
        let description = middleware.toString();
        expect(description).to.be.a('string');
      });
    });
  });
});
