const axios = require('axios');
const Logger = require('./logger');

class AIFirewall {
    constructor(apiKey, mode = 'BLOCK', mongoUrl = null) {
        this.apiKey = apiKey;
        this.mode = mode;
        this.logger = new Logger(mongoUrl);
    }

    async analyze(req) {
        const context = {
            method: req.method,
            path: req.path,
            body: req.body,
            headers: {
                userAgent: req.headers['user-agent'],
                contentType: req.headers['content-type']
            }
        };

        console.log('[AI Firewall] Analyzing request:', req.method, req.path);
        console.log('[AI Firewall] Request body:', JSON.stringify(req.body, null, 2));

        try {
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: 'mistralai/voxtral-small-24b-2507',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a security firewall AI. Analyze HTTP requests for malicious patterns like SQL injection, XSS, command injection, etc. Respond ONLY with valid JSON in this exact format: {"decision": "BLOCK" or "ALLOW", "reason": "brief explanation", "threat": "threat type or null"}'
                        },
                        {
                            role: 'user',
                            content: `Analyze this request:\n${JSON.stringify(context, null, 2)}`
                        }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 5000
                }
            );

            const aiResponse = response.data.choices[0].message.content;
            console.log('[AI Firewall] Full API Data:', JSON.stringify(response.data, null, 2));
            console.log('[AI Firewall] Raw AI Response:', aiResponse);

            const cleanJson = aiResponse.replace(/```json\n?|```/g, '').trim();
            const decision = JSON.parse(cleanJson);

            console.log('[AI Firewall] AI Decision:', JSON.stringify(decision, null, 2));

            return decision;
        } catch (error) {
            if (error.response) {
                console.error('[AI Firewall] API Error:', error.response.status, error.response.statusText);
                console.error('[AI Firewall] API data:', JSON.stringify(error.response.data));
            } else {
                console.error('[AI Firewall] Error:', error.message);
            }
            return { decision: 'ALLOW', reason: 'AI error - fail open', threat: null };
        }
    }

    middleware() {
        return async (req, res, next) => {
            if (req.path === '/health') {
                return next();
            }

            const result = await this.analyze(req);

            await this.logger.log({
                timestamp: new Date(),
                ip: req.ip || req.connection.remoteAddress,
                method: req.method,
                path: req.path,
                body: req.body,
                aiDecision: result.decision,
                aiReason: result.reason,
                threat: result.threat,
                blocked: result.decision === 'BLOCK' && this.mode === 'BLOCK'
            });

            if (result.decision === 'BLOCK' && this.mode === 'BLOCK') {
                console.log('[AI Firewall] BLOCKED:', result.reason);
                return res.status(403).json({
                    error: 'Request blocked by AI Firewall',
                    reason: result.reason,
                    threat: result.threat
                });
            }

            console.log('[AI Firewall] ALLOWED:', result.reason);
            next();
        };
    }
}

module.exports = AIFirewall;
