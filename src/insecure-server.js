const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the SAME vulnerable login page, but modified to say "Unprotected"
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>VulnerableBank - UNPROTECTED</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, sans-serif; background: #fee; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2); width: 400px; border: 2px solid #dc2626; }
        h1 { margin-bottom: 0.5rem; color: #dc2626; }
        .subtitle { margin-bottom: 1.5rem; color: #666; font-size: 14px; }
        label { display: block; margin-bottom: 0.5rem; color: #666; font-size: 14px; }
        input { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 1rem; font-size: 14px; }
        button { width: 100%; padding: 0.75rem; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #b91c1c; }
        #message { margin-top: 1rem; padding: 0.75rem; border-radius: 4px; font-size: 14px; }
        .error { background: #fee; color: #c00; }
        .success { background: #efe; color: #090; }
    </style>
</head>
<body>
    <div class="card">
        <h1>UNPROTECTED Server</h1>
        <p class="subtitle">No AI Firewall. Attacks will succeed.</p>
        <form id="loginForm">
            <label>Username</label>
            <input type="text" id="username" placeholder="admin" required>
            
            <label>Password</label>
            <input type="password" id="password" placeholder="password" required>
            
            <button type="submit">Sign In (Unsafe)</button>
        </form>
        <div id="message"></div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const msg = document.getElementById('message');
            msg.textContent = 'Processing...';
            msg.className = '';

            const data = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const body = await res.json();
                if (body.status === 'success') {
                    msg.textContent = 'HACKED: ' + body.message;
                    msg.className = 'success';
                } else {
                    msg.textContent = body.message;
                    msg.className = 'error';
                }
            } catch (err) {
                msg.textContent = 'Network error';
                msg.className = 'error';
            }
        });
    </script>
</body>
</html>
    `);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // VULNERABLE CODE - No AI Check
    const simulatedQuery = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    console.log('[Unprotected] Executing:', simulatedQuery);

    if (username.includes("'") || username.includes("OR")) {
        return res.json({
            status: 'success',
            message: 'SQL Injection SUCCESSFUL! Database compromised.',
            query: simulatedQuery
        });
    }

    res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
    });
});

app.listen(PORT, () => {
    console.log('[Unprotected] Vulnerable Server running on http://localhost:' + PORT);
});
