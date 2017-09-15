'use strict';

const fs = require('fs');
const { version } = require('../../package.json');

function getCommit () {
    if (process.env.OPENSHIFT_BUILD_COMMIT) {
        return String(process.env.OPENSHIFT_BUILD_COMMIT).substring(0, 7);
    }

    try {
        return fs.readFileSync('commit.txt', 'utf-8').trim();
    } catch (ignored) {
    }

    return 'unknown';
}

module.exports = {
    version,
    commit: getCommit()
};

module.exports.full = `InsightsWebhooks/${module.exports.commit}`;
