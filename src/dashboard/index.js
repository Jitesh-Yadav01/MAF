const express = require('express');
const logger = require('../core/logger');
const replayEngine = require('../core/replay-engine');
const config = require('../config');
const sessionManager = require('../core/session-manager');

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Unauthorized' });
    next();
};

router.get('/health', (req, res) => res.json({ status: 'ok' }));

router.get('/ready', async (req, res) => {
    const redisOk = sessionManager.redis.status === 'ready';
    const mongoOk = logger.connected;

    if (redisOk && mongoOk) {
        res.json({ status: 'ready', redis: 'ok', mongo: 'ok' });
    } else {
        res.status(503).json({ status: 'not_ready', redis: redisOk ? 'ok' : 'down', mongo: mongoOk ? 'ok' : 'down' });
    }
});

router.use(authMiddleware);

router.get('/events', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const filter = {};
        if (req.query.sessionId) filter.sessionId = req.query.sessionId;
        if (req.query.minRisk) filter.riskScore = { $gte: parseInt(req.query.minRisk) };

        const events = await logger.getEvents(filter, limit);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await logger.getStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/replay/:eventId', async (req, res) => {
    try {
        const result = await replayEngine.replayEvent(req.params.eventId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
