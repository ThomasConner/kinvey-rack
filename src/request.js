import Response from './response';

class Request {
  constructor() {
    this.response = new Response();
  }

  execute() {
    return Promise.reject('A subclass must override this method.');
  }
}

// Export Request
export default Request;
