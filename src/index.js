require('dotenv').config();
const express = require('express');
const path = require('path');
const AIFirewall = require('./ai-firewall');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const firewall = new AIFirewall(
    process.env.OPENROUTER_API_KEY,
    process.env.MAF_MODE || 'BLOCK',
    process.env.MONGO_URL
);

app.use(firewall.middleware());

const dashboardApp = express();
const DASHBOARD_PORT = 3001;

// Dashboard API
dashboardApp.get('/api/events', async (req, res) => {
    try {
        const events = await firewall.logger.getEvents(100);
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

dashboardApp.get('/api/stats', async (req, res) => {
    const events = await firewall.logger.getEvents(1000);
    const blocked = events.filter(e => e.blocked).length;
    const threats = events.filter(e => e.threat).length;
    res.json({
        total: events.length,
        blocked,
        threats,
        uptime: process.uptime()
    });
});

// Serve Dashboard UI
dashboardApp.use(express.static(path.join(__dirname, '../dashboard/dist')));
dashboardApp.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dashboard/dist/index.html'));
});

dashboardApp.listen(DASHBOARD_PORT, () => {
    console.log('[Dashboard] Running on http://localhost:' + DASHBOARD_PORT);
});

// Start Unprotected Server (Port 3002)
require('./insecure-server');

// Main Gateway App (Port 3000)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo', 'login.html'));
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const simulatedQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log('[Backend] Executing:', simulatedQuery);

    if (username.includes("'") || username.includes("OR")) {
        return res.json({
            status: 'success',
            message: 'SQL Injection succeeded! (You should never see this)',
            query: simulatedQuery
        });
    }

    res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log('[MAF] AI-First Firewall running on http://localhost:' + PORT);
    console.log('[MAF] Mode:', process.env.MAF_MODE || 'BLOCK');
    console.log('[MAF] API Key:', process.env.OPENROUTER_API_KEY ? 'Configured' : 'MISSING!');
});
