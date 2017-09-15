/* global describe, it */
'use strict';

require('should');
const events = require('./');

describe('Events', function () {

    describe('webhook:ping', function () {
        it('produces ping message', function () {
            events['webhook:ping']().should.equal('Test event from Insights');
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
});
