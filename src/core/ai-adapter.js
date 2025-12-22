const axios = require('axios');
const config = require('../config');

class AiAdapter {
    constructor() {
        this.failures = 0;
        this.circuitOpen = false;
        this.resetTimeout = null;
    }

    async evaluateRisk(signals) {
        if (this.circuitOpen) return null;

        const context = {
            route: signals.route,
            method: signals.method,
            userAgent: signals.userAgent,
            payloadMeta: signals.payloadMetadata
        };

        try {
            if (!config.MAF_AI_API_KEY) {
                return { suggestion: 'ALLOW', confidence: 0.5, reasoning: 'Mock AI: No API Key' };
            }

            return {
                suggestion: 'ALLOW',
                confidence: 0.5,
                reasoning: 'Not fully implemented'
            };

        } catch (error) {
            this.failures++;
            if (this.failures > 5) {
                this.circuitOpen = true;
                this.resetTimeout = setTimeout(() => {
                    this.circuitOpen = false;
                    this.failures = 0;
                }, 60000);
            }
            throw error;
        }
    }
}

module.exports = new AiAdapter();
