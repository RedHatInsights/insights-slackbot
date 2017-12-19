'use strict';

const config = require('../config');

const SEVERITIES = {
    INFO: 'low severity',
    WARN: 'medium severity',
    ERROR: 'high severity',
    CRITICAL: 'very high severity'
};

function getIcon (msg) {
    if (msg.rule.severity === 'CRITICAL' || msg.rule.severity === 'ERROR') {
        return ':exclamation: ';
    }

    if (msg.rule.severity === 'WARN') {
        return ':warning: ';
    }

    return '';
}

function getProblemDescription (msg) {
    return [
        SEVERITIES[msg.rule.severity],
        msg.rule.category.toLowerCase()
    ].join(' ');
}

function systemLink (system) {
    return `<${config.insights.url}/inventory?machine=${system.system_id}|${system.toString}>`;
}

function ruleLink (rule) {
    return `<${config.insights.url}/actions/${rule.category.toLowerCase()}/${encodeURIComponent(rule.rule_id)}|${rule.description}>`;
}

module.exports = {
    'system:registered': function (msg) {
        return `System registered: ${systemLink(msg.system)} (${msg.system.system_id})`;
    },

    'system:unregistered': function (msg) {
        return `System unregistered: *${msg.system.toString}* (${msg.system.system_id})`;
    },

    'report:new': function (msg) {
        const r = msg.report;
        return `${getIcon(r)}${systemLink(r.system)}: new ${getProblemDescription(r)} problem: ${ruleLink(r.rule)}`;
    },

    'report:resolved': function (msg) {
        const r = msg.report;
        return `:white_check_mark: ${systemLink(r.system)}: ${getProblemDescription(r)} problem resolved: ${ruleLink(r.rule)}`;
    },

    'webhook:ping': function (msg) {
        return `Test event from Insights (timestamp: ${msg.timestamp})`;
    },

    'policy:new': function (msg) {
        return `Policy added: *${msg.policy.policy_name}* (${msg.policy.policy_id})`;
    },

    'policy:removed': function (msg) {
        return `Policy removed: *${msg.policy.policy_id}*`;
    }
};

// wrap event processor with @here for certain events configured via ATHERE
config.here.forEach(event => {
    const delegate = module.exports[event];

    if (!delegate) {
        throw new Error(`Invalid event type: ${event}`);
    }

    module.exports[event] = function (...args) {
        const result = delegate(...args);
        return `<!here> ${result}`;
    };
});
