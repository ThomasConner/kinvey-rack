var Rack = require('./../../src/rack');

describe('Rack', function() {

  it('should be a class', function() {
    expect(Rack).to.be.a('Function');
  });

  describe('#getMiddleware()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('getMiddleware');
    });
  });

  describe('#use()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('use');
    });
  });

  describe('#useBefore()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('useBefore');
    });
  });

  describe('#useAfter()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('useAfter');
    });
  });

  describe('#swap()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('swap');
    });
  });

  describe('#remove()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('remove');
    });
  });

  describe('#execute()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('execute');
    });
  });

  describe('#handle()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('handle');
    });
  });

  describe('#toString()', function() {
    it('should respond', function() {
      expect(Rack).to.respondTo('toString');
    });
  });
});
