const express = require('express');
const config = require('./config');
const gateway = require('./middleware/gateway');
const logger = require('./core/logger');

const app = express();

app.use(express.json());

app.use(gateway);

if (config.DASHBOARD_PORT) {
    const dashboardApp = express();
    dashboardApp.use(express.json());

    const path = require('path');
    dashboardApp.use('/', express.static(path.join(__dirname, 'dashboard', 'public')));

    dashboardApp.use('/api', require('./dashboard'));

    dashboardApp.listen(config.DASHBOARD_PORT, () => {
        console.log(`📊 Dashboard API running on http://localhost:${config.DASHBOARD_PORT}`);
    });
}

app.get('/', (req, res) => {
    res.send('<h1>MAF Secured App</h1><p>If you see this, you passed the firewall.</p>');
});

app.post('/api/login', (req, res) => {
    res.json({ message: 'Login flow triggered', status: 'ok' });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(config.PORT, () => {
    console.log(`🛡️  MAF Gateway running on http://localhost:${config.PORT}`);
    console.log(`⚙️  Mode: ${config.MAF_MODE}`);
});
