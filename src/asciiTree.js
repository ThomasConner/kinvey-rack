const levels = [];
let c0 = String.fromCharCode(9500);
let c1 = String.fromCharCode(9472);
let c2 = String.fromCharCode(9492);
let c3 = String.fromCharCode(9474);

class AsciiTree {
    static generate(node = {}) {
      let asciiTree = new AsciiTree();
      return asciiTree.generate(node);
    }

    generate(tree = {}, end = true) {
      let result = this.compose(tree, end);

      if (tree.nodes.length > 0) {
        let last = tree.nodes.length - 1;
        tree.nodes.forEach((subTree, index) => {
          levels[subTree.level] = index === last;
          result = result + this.generate(subTree, index === last);
        });
      }

      return result;
    }

    compose(node = {}, end = true) {
      if (node.level === 0) {
        return node.value;
      }

      let ret = '\r\n';
      let c = end ? c2 : c0;

      for (let i = 1; i < node.level; i++) {
        ret = `${ret}${levels[i] ? ' ' : c3}`;
        ret = `${ret}  `;
      }

      return `${ret}${c}${c1} ${node.value}`;
    }
}

export default AsciiTree;
