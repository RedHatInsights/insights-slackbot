/* global beforeEach, afterEach */
'use strict';

require('should');
const sinon = require('sinon');

beforeEach(() => exports.sandbox = sinon.sandbox.create());
afterEach(() => exports.sandbox.restore());
