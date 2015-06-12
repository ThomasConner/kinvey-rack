/*eslint-disable*/

require('es6-shim');
var Rack = require('../build/rack');
var Middleware = require('../build/middleware');

// Create a rack
var rack = new Rack();

// Add a middleware to it
var serializeMiddleware = new Middleware('Serialize Middleware');
rack.use(serializeMiddleware);

// Create a custom rack
var customRack = new Rack('Custom Rack');

// Add a cache middleware to it
var cacheMiddleware = new Middleware('Cache Middleware');
customRack.use(cacheMiddleware);

// Add the custom rack to the rack
rack.use(customRack);

// Add an http middleware to the top of the rack
var httpMiddleware = new Middleware('Http Middleware');
customRack.useBefore(Middleware, httpMiddleware);

// Add a parser middleware to the end of the rack
var parserMiddleware = new Middleware('Parser Middleware');
rack.use(parserMiddleware);

// Print out the rack
console.log(rack.toString());
