import AsciiTree from '../../src/asciiTree';
import chai from 'chai';
let expect = chai.expect;

describe('AsciiTree', () => {
  let asciiTree = new AsciiTree();

  it('should be a class', () => {
    expect(AsciiTree).to.be.a('Function');
  });

  describe('.generate()', () => {
    it('should respond', () => {
      expect(AsciiTree).to.respondTo('generate');
    });

    it('should return a string', () => {
      let node = {
        level: 0,
        value: 'node',
        nodes: []
      };
      let description = asciiTree.generate(node);
      expect(typeof description).to.be.equal('string');
    });
  });

  describe('.prototype', () => {
    describe('.generate()', () => {
      it('should respond', () => {
        expect(AsciiTree.prototype).to.respondTo('generate');
      });

      it('should return a string', () => {
        let node = {
          level: 0,
          value: 'node',
          nodes: []
        };
        let description = asciiTree.generate(node, true);
        expect(typeof description).to.be.equal('string');
      });
    });

    describe('.compose()', () => {
      it('should respond', () => {
        expect(AsciiTree.prototype).to.respondTo('compose');
      });

      it('should return a string', () => {
        let node = {
          level: 0,
          value: 'node',
          nodes: []
        };
        let description = asciiTree.compose(node, true);
        expect(typeof description).to.be.equal('string');
      });
    });
  });
});
