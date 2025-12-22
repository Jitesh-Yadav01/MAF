const Redis = require('ioredis');
const config = require('../config');

class SessionManager {
    constructor() {
        this.redis = new Redis(config.REDIS_URL, {
            retryStrategy: (times) => Math.min(times * 50, 2000),
        });

        this.redis.on('error', (err) => {
            console.error('Redis Error:', err);
        });
    }

    getKey(sessionId) {
        return `maf:sess:${sessionId}`;
    }

    async getSession(sessionId) {
        const key = this.getKey(sessionId);
        const data = await this.redis.hgetall(key);

        if (!data || Object.keys(data).length === 0) {
            return null;
        }

        if (data.history) {
            try {
                data.history = JSON.parse(data.history);
            } catch (e) {
                data.history = [];
            }
        }

        if (data.riskScore) data.riskScore = parseInt(data.riskScore, 10);

        return data;
    }

    async createOrUpdateSession(sessionId, updates, ttlSeconds = 3600) {
        const key = this.getKey(sessionId);

        const pipeline = this.redis.pipeline();

        const safeUpdates = { ...updates };
        if (safeUpdates.history) {
            safeUpdates.history = JSON.stringify(safeUpdates.history);
        }

        pipeline.hset(key, safeUpdates);
        pipeline.expire(key, ttlSeconds);

        await pipeline.exec();
    }

    async dropSession(sessionId) {
        const key = this.getKey(sessionId);
        await this.redis.del(key);
    }

    async updateHistory(sessionId, eventMeta, windowSize = 10) {
        const session = await this.getSession(sessionId) || { history: [] };
        const history = session.history || [];

        history.push(eventMeta);

        if (history.length > windowSize) {
            history.shift();
        }

        await this.createOrUpdateSession(sessionId, { history });
    }
}

module.exports = new SessionManager();
