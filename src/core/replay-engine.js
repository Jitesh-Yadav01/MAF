const config = require('../config');
const logger = require('./logger');
const riskEngine = require('./risk-engine');
const decisionEngine = require('./decision-engine');

class ReplayEngine {
    async replayEvent(eventId) {
        const events = await logger.getEvents({ eventId }, 1);
        if (!events || events.length === 0) {
            throw new Error('Event not found');
        }
        const originalEvent = events[0];

        const signals = {
            ip: originalEvent.ip,
            region: originalEvent.region,
            fingerprint: originalEvent.fingerprint,
            route: originalEvent.route,
            method: originalEvent.method,
            userAgent: originalEvent.metadata?.userAgent || 'unknown',
            payloadMetadata: originalEvent.metadata || {}
        };

        const riskResult = await riskEngine.evaluate(signals, null);
        const decision = decisionEngine.decide(riskResult);

        return {
            eventId,
            original: {
                score: originalEvent.riskScore,
                decision: originalEvent.decision,
                factors: originalEvent.factors
            },
            replay: {
                score: riskResult.score,
                decision: decision,
                factors: riskResult.factors
            },
            match: originalEvent.decision === decision
        };
    }
}

module.exports = new ReplayEngine();
