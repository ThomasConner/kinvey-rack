import AsciiTree from '../../src/asciiTree';
import chai from 'chai';
let expect = chai.expect;

describe('AsciiTree', () => {
  it('should be a class', () => {
    expect(AsciiTree).to.be.a('Function');
  });

  describe('.generate()', () => {
    it('should respond', () => {
      expect(AsciiTree).itself.to.respondTo('generate');
    });

    it('should return a string', () => {
      let node = {
        level: 0,
        value: 'node',
        nodes: []
      };
      let description = AsciiTree.generate(node);
      expect(description).to.be.a('string');
    });
  });
});
