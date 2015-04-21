global._ = require('lodash');
var Rack = require('./../../dist/rack');
var myRack = new Rack('My Rack');
var myRack2 = new Rack('My Rack2');

myRack.use(new Rack('Rack2'));
myRack.use(new Rack('Rack3'));
myRack2.use(myRack);
console.log(myRack2.toString());
