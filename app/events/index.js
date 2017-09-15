'use strict';

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
    return `<https://access.redhat.com/insights/inventory?machine=${system.system_id}|${system.toString}>`;
}

function ruleLink (rule) {
    return `<https://access.redhat.com/insights/actions/${rule.category.toLowerCase()}/${encodeURIComponent(rule.rule_id)}|${rule.description}>`;
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

    'webhook:ping': function () {
        return `Test event from Insights`;
    }
};
