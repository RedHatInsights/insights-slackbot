/* global describe, it */
'use strict';

require('should');
const events = require('./');

describe('Events', function () {

    describe('webhook:ping', function () {
        it('produces ping message', function () {
            const date = new Date();
            events['webhook:ping']({
                timestamp: date.toISOString()
            }).should.equal(`Test event from Insights (timestamp: ${date.toISOString()})`);
        });
    });

    describe('report:new', function () {
        it('produces desired output', function () {
            const msg = {
                report: {
                    system: {
                        system_id: 'dd18ed75-44f5-4fd1-8ca0-ed08c2d9c320',
                        toString: 'rhelbox'
                    },
                    rule: {
                        severity: 'ERROR',
                        category: 'Security',
                        description: 'Heartbleed',
                        rule_id: 'heartbleed|heartbleed'
                    }
                }
            };

            const result = events['report:new'](msg);
            result.should.equal(':exclamation: <https://access.redhat.com/insights/inventory?machine=dd18ed75-44f5-4fd1-8ca0-ed08c2d9c320|rhelbox>' +
                ': new high severity security problem: <https://access.redhat.com/insights/actions/security/heartbleed%7Cheartbleed|Heartbleed>');
        });
    });

    describe('system:registered', function () {
        it('produces desired output', function () {
            const msg = {
                system: {
                    system_id: 'dd18ed75-44f5-4fd1-8ca0-ed08c2d9c320',
                    toString: 'jozef_vm04'
                }
            };

            const result = events['system:registered'](msg);
            result.should.equal('System registered: <https://access.redhat.com/insights/inventory?machine=dd18ed75-44f5-4fd1-8ca0-ed08c2d9c320|jozef_vm04>' +
                ' (dd18ed75-44f5-4fd1-8ca0-ed08c2d9c320)');
        });
    });

    describe('policy:new', function () {
        it('produces desired output', function () {
            const msg = {
                policy: {
                    policy_id: 'policy-1',
                    policy_name: 'Policy 1'
                }
            };

            const result = events['policy:new'](msg);
            result.should.equal('Policy added: *Policy 1* (policy-1)');
        });
    });

    describe('policy:new', function () {
        it('produces desired output', function () {
            const msg = {
                policy: {
                    policy_id: 'policy-1'
                }
            };

            const result = events['policy:removed'](msg);
            result.should.equal('Policy removed: *policy-1*');
        });
    });
});
