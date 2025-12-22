const config = require('../config');

class DecisionEngine {
    decide(riskResult) {
        const score = riskResult.score;
        const mode = config.MAF_MODE;

        const suggestedAction = this.getSuggestedAction(score);

        if (mode === 'MONITOR') {
            return 'ALLOW';
        }

        return suggestedAction;
    }

    getSuggestedAction(score) {
        if (score >= config.RISK_THRESHOLD_DROP) {
            return 'DROP_SESSION';
        } else if (score >= config.RISK_THRESHOLD_BLOCK) {
            return 'BLOCK';
        }
        return 'ALLOW';
    }
}

module.exports = new DecisionEngine();
