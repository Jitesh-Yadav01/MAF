const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ip: String,
    method: String,
    path: String,
    body: Object,
    aiDecision: String,
    aiReason: String,
    threat: String,
    blocked: Boolean
});

const Event = mongoose.model('Event', eventSchema);

class Logger {
    constructor(mongoUrl) {
        this.connected = false;
        if (mongoUrl) {
            this.connect(mongoUrl);
        }
    }

    async connect(url) {
        try {
            await mongoose.connect(url);
            this.connected = true;
            console.log('[Logger] Connected to MongoDB');
        } catch (err) {
            console.error('[Logger] MongoDB connection failed:', err.message);
        }
    }

    async log(data) {
        if (!this.connected) return;

        try {
            await Event.create(data);
        } catch (err) {
            console.error('[Logger] Failed to log event:', err.message);
        }
    }

    async getEvents(limit = 50) {
        if (!this.connected) return [];
        return Event.find().sort({ timestamp: -1 }).limit(limit);
    }
}

module.exports = Logger;
