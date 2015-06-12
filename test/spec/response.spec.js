import Response from '../../src/response';
import chai from 'chai';
let expect = chai.expect;

describe('Response', () => {
  let response = new Response();

  it('should be a class', () => {
    expect(Response).to.be.a('Function');
  });
});
