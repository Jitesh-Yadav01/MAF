const riskEngine = require('../src/core/risk-engine');
const decisionEngine = require('../src/core/decision-engine');

describe('Risk Engine', () => {
    test('should detect device change', async () => {
        const signals = { fingerprint: 'new-device', payloadMetadata: { size: 100 } };
        const sessionProfile = { lastFingerprint: 'old-device' };

        const result = await riskEngine.evaluate(signals, sessionProfile);
        expect(result.score).toBeGreaterThanOrEqual(30);
        expect(result.factors).toContain('device_change');
    });

    test('should detect high velocity', async () => {
        const signals = { fingerprint: 'same', payloadMetadata: { size: 100 } };
        const history = Array(25).fill({ timestamp: Date.now() });
        const sessionProfile = { lastFingerprint: 'same', history };

        const result = await riskEngine.evaluate(signals, sessionProfile);
        expect(result.score).toBeGreaterThanOrEqual(40);
        expect(result.factors).toContain('high_velocity');
    });
});

describe('Decision Engine', () => {
    test('should ALLOW when score is low', () => {
        const action = decisionEngine.decide({ score: 10 });
        expect(action).toBe('ALLOW');
    });
});
