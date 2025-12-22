class SessionManager {
    constructor() {
        this.sessions = new Map();
        this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }

    getKey(sessionId) {
        return `sess:${sessionId}`;
    }

    async getSession(sessionId) {
        const data = this.sessions.get(sessionId);

        if (!data) {
            return null;
        }

        return JSON.parse(JSON.stringify(data));
    }

    async createOrUpdateSession(sessionId, updates, ttlSeconds = 3600) {
        let current = this.sessions.get(sessionId) || {};

        const updatedSession = {
            ...current,
            ...updates,
            expiresAt: Date.now() + (ttlSeconds * 1000)
        };

        if (updates.history) {
            updatedSession.history = updates.history;
        }

        this.sessions.set(sessionId, updatedSession);
    }

    async dropSession(sessionId) {
        this.sessions.delete(sessionId);
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

    cleanup() {
        const now = Date.now();
        for (const [id, session] of this.sessions.entries()) {
            if (session.expiresAt && session.expiresAt < now) {
                this.sessions.delete(id);
            }
        }
    }
}

module.exports = new SessionManager();
