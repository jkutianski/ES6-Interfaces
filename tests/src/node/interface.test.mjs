/* global describe */

import * as assert from 'assert';

import { Interface } from '../../../src/interface.mjs';

import { CommonTests } from '../common/interface.test.mjs';

describe('Node', function() {

  CommonTests(assert, Interface);

});
