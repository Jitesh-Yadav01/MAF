const config = require('../config');
const aiAdapter = require('./ai-adapter');

class RiskEngine {
    async evaluate(signals, sessionProfile) {
        let score = 0;
        const factors = [];

        if (sessionProfile && sessionProfile.lastFingerprint && sessionProfile.lastFingerprint !== signals.fingerprint) {
            score += 30;
            factors.push('device_change');
        }

        if (sessionProfile && sessionProfile.history) {
            const recentReqs = sessionProfile.history.filter(h => h.timestamp > Date.now() - 10000);
            if (recentReqs.length > 20) {
                score += 40;
                factors.push('high_velocity');
            }
        }

        if (signals.payloadMetadata.size > 100000) {
            score += 10;
            factors.push('large_payload');
        }

        score = Math.min(score, 100);

        let aiAnalysis = null;
        if (config.MAF_AI_ENABLED && score > 40 && score < 85) {
            try {
                const aiResult = await aiAdapter.evaluateRisk(signals);
                if (aiResult) {
                    aiAnalysis = aiResult;
                    if (aiResult.confidence > 0.7) {
                        if (aiResult.suggestion === 'BLOCK') score += 30;
                        if (aiResult.suggestion === 'ALLOW') score -= 20;
                    }
                }
            } catch (err) {
            }
        }

        return {
            score: Math.max(0, Math.min(score, 100)),
            factors,
            aiAnalysis
        };
    }
}

module.exports = new RiskEngine();
