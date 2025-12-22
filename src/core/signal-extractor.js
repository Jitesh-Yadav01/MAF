const crypto = require('crypto');

function extractSignals(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.get('User-Agent') || 'unknown';
    const route = req.originalUrl || req.url;
    const method = req.method;

    const fingerprintSource = [
        userAgent,
        req.get('Accept-Language'),
        req.get('Accept-Encoding'),
    ].join('|');

    const fingerprint = crypto.createHash('sha256').update(fingerprintSource).digest('hex');

    const region = 'US';

    const payloadMetadata = {
        size: req.get('content-length') ? parseInt(req.get('content-length')) : 0,
        hasBody: !!req.body,
        keys: req.body && typeof req.body === 'object' ? Object.keys(req.body) : [],
    };

    return {
        ip,
        userAgent,
        fingerprint,
        region,
        route,
        method,
        timestamp: new Date().toISOString(),
        payloadMetadata
    };
}

module.exports = { extractSignals };
