const mongoose = require('mongoose');
const config = require('../config');

const EventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now, index: true },
    sessionId: { type: String, required: true, index: true },
    ip: { type: String, required: true },
    region: { type: String },
    fingerprint: { type: String, index: true },
    route: { type: String, required: true },
    method: { type: String, required: true },
    riskScore: { type: Number, required: true, index: true },
    decision: {
        type: String,
        enum: ['ALLOW', 'BLOCK', 'DROP_SESSION', 'CHALLENGE'],
        required: true
    },
    factors: [String],
    aiAnalysis: {
        enabled: Boolean,
        suggestion: String,
        confidence: Number,
        latency: Number,
    },
    metadata: mongoose.Schema.Types.Mixed
});

const EventModel = mongoose.model('SecurityEvent', EventSchema);

class Logger {
    constructor() {
        this.connected = false;
        this.connect();
    }

    async connect() {
        try {
            await mongoose.connect(config.MONGO_URL);
            this.connected = true;
            console.log('✅ Connected to MongoDB');
        } catch (err) {
            console.error('❌ MongoDB Connection Error:', err);
        }
    }

    async logEvent(eventData) {
        if (!this.connected) return;

        EventModel.create(eventData).catch(err => {
            console.error('Failed to log event:', err);
        });
    }

    async getEvents(filter = {}, limit = 50, skip = 0) {
        if (!this.connected) return [];

        return await EventModel.find(filter)
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
    }

    async getStats() {
        if (!this.connected) return { total: 0, blocked: 0 };

        const total = await EventModel.countDocuments();
        const blocked = await EventModel.countDocuments({ decision: 'BLOCK' });
        return { total, blocked };
    }
}

module.exports = new Logger();
