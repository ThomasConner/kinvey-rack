import Request from '../../src/request';
import Response from '../../src/response';
import chai from 'chai';
let expect = chai.expect;

describe('Request', () => {
  let request = new Request();

  it('should be a class', () => {
    expect(Request).to.be.a('Function');
  });

  describe('.prototype', () => {
    describe('.response', () => {
      it('should be an instance of the Response class', () => {
        expect(request.response).to.exist;
        expect(request.response).to.be.an.instanceof(Response);
      });
    });
  });
});
