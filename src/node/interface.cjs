const assert = require('assert');

const { Interface } = require('es6-interfaces');

const { CommonTests } = require('./common_test.js');

describe('Node Require', function() {

  CommonTests(assert, Interface);

});
