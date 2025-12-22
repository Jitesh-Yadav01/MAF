const signalExtractor = require('../core/signal-extractor');
const sessionManager = require('../core/session-manager');
const riskEngine = require('../core/risk-engine');
const decisionEngine = require('../core/decision-engine');
const logger = require('../core/logger');

async function gateway(req, res, next) {
    const startTime = Date.now();

    try {
        const signals = signalExtractor.extractSignals(req);
        const sessionId = req.headers['x-session-id'] ||
            require('crypto').createHash('md5').update(signals.ip + signals.fingerprint).digest('hex');

        const sessionProfile = await sessionManager.getSession(sessionId);

        const riskResult = await riskEngine.evaluate(signals, sessionProfile);

        const decision = decisionEngine.decide(riskResult);

        const eventLog = {
            eventId: require('uuid').v4(),
            timestamp: new Date(),
            sessionId,
            ip: signals.ip,
            region: signals.region,
            fingerprint: signals.fingerprint,
            route: signals.route,
            method: signals.method,
            riskScore: riskResult.score,
            decision: decision,
            factors: riskResult.factors,
            aiAnalysis: riskResult.aiAnalysis,
            metadata: signals.payloadMetadata
        };
        logger.logEvent(eventLog);

        sessionManager.updateHistory(sessionId, {
            timestamp: Date.now(),
            fingerprint: signals.fingerprint,
            riskScore: riskResult.score
        });

        if (decision === 'BLOCK') {
            return res.status(403).json({ error: 'Access Denied', requestId: eventLog.eventId });
        }

        if (decision === 'DROP_SESSION') {
            await sessionManager.dropSession(sessionId);
            return res.status(403).json({ error: 'Session Terminated', requestId: eventLog.eventId });
        }

        if (decision === 'CHALLENGE') {
            return res.status(403).json({ error: 'Verification Required', challenge: true, requestId: eventLog.eventId });
        }

        next();

    } catch (error) {
        console.error('MAF Gateway Error:', error);
        next();
    }
}

module.exports = gateway;
