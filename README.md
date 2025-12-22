# MAF - AI-First Model Application Firewall

Clean, minimal implementation where **ALL requests go to AI first** for security analysis.

## Architecture

```
Request → AI Analysis (OpenRouter) → Decision (BLOCK/ALLOW) → Forward/Drop
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=3000
OPENROUTER_API_KEY=sk-or-v1-YOUR_KEY_HERE
MAF_MODE=BLOCK
```

3. Start server:
```bash
npm start
```

4. Test at `http://localhost:3000`

## Test SQL Injection

Try logging in with:
- Username: `admin' OR '1'='1`
- Password: anything

The AI will detect and BLOCK the attack.

## Logs

Watch terminal for:
```
[AI Firewall] Analyzing request: POST /api/login
[AI Firewall] Raw AI Response: ...
[AI Firewall] AI Decision: { "decision": "BLOCK", ... }
[AI Firewall] BLOCKED: SQL injection detected
```
