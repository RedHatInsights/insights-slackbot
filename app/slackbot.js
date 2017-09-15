'use strict';

const _ = require('lodash');
const P = require('bluebird');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const WebClient = require('@slack/client').WebClient;
const web = new WebClient(config.slack.token);
const postMessage = P.promisify(web.chat.postMessage, {context: web.chat});

const events = require('./events');
const log = require('./util/log');
const version = require('./util/version');

exports.start = function () {
    const app = express();
    app.use(bodyParser.json());

    app.post(`/webhook/${config.server.secret}`, handler);
    app.get(`/webhook/status`, (req, res) => res.status(200).end());
    app.listen(config.server.port, () => {
        log.info(`InsightsSlackbot/${version.commit} listening on http://localhost:${config.server.port}/webhook/${config.server.secret}`);
    });
};

function handler (req, res) {
    if (!_.has(req.headers, 'x-rhi-event')) {
        return res.status(400).end();
    }

    log.trace({headers: req.headers, body: req.body}, 'incoming request');
    const event = req.headers['x-rhi-event'];

    if (!_.has(events, event)) {
        log.info({event}, 'unrecognized event, ignoring');
        return res.status(200).end();
    }

    try {
        log.info({event}, 'new event, sending to slack');

        const msg = events[event](req.body);
        postMessage(config.slack.channel, msg, {
            as_user: true,
            unfurl_links: false
        })
        .then(() => log.debug({ event }, 'succesfully posted to slack'))
        .catch(err => log.error(err));

        res.status(202).end();
    } catch (e) {
        log.error(e, 'error converting event to slack message');
        res.status(500).end();
    }
}
