'use strict';

const bunyan = require('bunyan');

const conf = {
    name: 'insights-webhooks',
    streams: [{
        level: 'trace',
        stream: process.stdout
    }]
};

module.exports = bunyan.createLogger(conf);
