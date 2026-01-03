const fs = require('fs');
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    fs.writeFileSync('server_error.log', `Reason: ${reason}\nStack: ${reason.stack}\nJSON: ${JSON.stringify(reason, Object.getOwnPropertyNames(reason))}`);
});

require('dotenv').config({ path: '../.env' }); // Load from root
const express = require('express');
const next = require('next');
const path = require('path');
const AIFirewall = require('../src/ai-firewall');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3000;
const DASHBOARD_PORT = 3001;

// Initialize Firewall
const firewall = new AIFirewall(
    process.env.OPENROUTER_API_KEY,
    process.env.MAF_MODE || 'BLOCK',
    process.env.MONGO_URL
);

app.prepare().then(() => {
    // ---------------------------------------------------------
    // 1. Main App Server (Protected by MAF)
    // ---------------------------------------------------------
    const server = express();

    // Parse bodies for MAF analysis
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    // Catch-all: parse other bodies as text
    server.use(express.text({ type: '*/*' }));

    // Debug Middleware (Commented out for production)
    /*
    server.use((req, res, next) => {
        console.log(`[Server] ${req.method} ${req.url}`);
        console.log(`[Server] Content-Type: ${req.headers['content-type']}`);
        console.log(`[Server] Body:`, JSON.stringify(req.body, null, 2));
        next();
    });
    */

    // Apply MAF Middleware
    server.use(firewall.middleware());

    // Handle all other requests with Next.js
    server.all(/.*/, (req, res) => {
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> App running on http://localhost:${PORT}`);
        console.log(`> MAF Protection: ${process.env.MAF_MODE || 'BLOCK'}`);
    });

    // ---------------------------------------------------------
    // 2. Dashboard Server (Port 3001)
    // ---------------------------------------------------------
    const dashboardApp = express();

    // Dashboard API using the SAME firewall instance
    dashboardApp.get('/api/events', async (req, res) => {
        try {
            const events = await firewall.logger.getEvents(100);
            res.json(events);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    dashboardApp.get('/api/stats', async (req, res) => {
        try {
            // Provide a default empty array if getEvents returns nothing logic can be handled inside logger but robust here
            const events = await firewall.logger.getEvents(1000) || [];
            const blocked = events.filter(e => e.blocked).length;
            const threats = events.filter(e => e.threat).length;
            res.json({
                total: events.length,
                blocked,
                threats,
                uptime: process.uptime()
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Serve Dashboard UI
    // Assuming dashboard is built in ../dashboard/dist
    const dashboardPath = path.join(__dirname, '../dashboard/dist');
    dashboardApp.use(express.static(dashboardPath));

    dashboardApp.get(/.*/, (req, res) => {
        res.sendFile(path.join(dashboardPath, 'index.html'));
    });

    dashboardApp.listen(DASHBOARD_PORT, () => {
        console.log(`> Dashboard running on http://localhost:${DASHBOARD_PORT}`);
    });
});
