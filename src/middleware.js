import AsciiTree from './asciiTree';

class Middleware {
  constructor(name = 'Middleware') {
    this.name = name;
  }

  handle(request = {}) {
    return Promise.resolve(request);
  }

  generateTree(level = 0) {
    let root = {
      value: this.name,
      level: level,
      nodes: []
    };
    return root;
  }

  toString() {
    let root = this.generateTree(0);
    return AsciiTree.generate(root);
  }
}

export default Middleware;
