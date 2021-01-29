const assert = require('assert');

const { Interface } = require('InterfaceJS');

const { CommonTests } = require('./common_test.js');

describe('Node Require', function() {

  CommonTests(assert, Interface);

});
