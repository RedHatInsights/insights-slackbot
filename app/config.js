'use strict';

if (!process.env.SLACK_TOKEN) {
    throw new Error('SLACK_TOKEN not specified');
}

if (typeof process.env.SLACK_TOKEN !== 'string' || !process.env.SLACK_TOKEN.startsWith('xoxb')) {
    throw new Error(`invalid SLACK_TOKEN value: ${process.env.SLACK_TOKEN}`);
}

module.exports = {
    slack: {
        token: process.env.SLACK_TOKEN,
        channel: process.env.SLACK_CHANNEL || 'insights-webhooks'
    },
    server: {
        secret: process.env.SERVER_SECRET || '*',
        port: process.env.SERVER_PORT || 3006
    },
    insights: {
        url: process.env.INSIGHTS_URL || 'https://access.redhat.com/insightsbeta'
    }
};
