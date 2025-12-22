# MAF - Model Application Firewall Specification

## 1. System Overview
MAF (Model Application Firewall) is a security middleware and gateway designed to protect backend services by intercepting requests, analyzing them for risk, and enforcing security policies. It leverages session profiling, behavioral analysis, and optional AI-based evaluation to detect malicious activity.

## 2. Architecture Modules

### 2.1 Central Configuration (`src/config`)
- **Responsibility**: Single source of truth for all system settings.
- **Implementation**: Uses `zod` for strict schema validation. Fails fast on startup if critical configs are missing.
- **Settings**:
  - `MAF_MODE`: `MONITOR` | `BLOCK` | `DROP`.
  - `RISK_THRESHOLDS`: Scores for Low/Medium/High.
  - `AI_SETTINGS`: `ENABLED`, `PROVIDER`, `TIMEOUT_MS`, `RETRIES`.
  - `DB_URLS`: Redis and Mongo connection strings.

### 2.2 Core Middleware (`Gateway`)
- **Responsibility**: Intercepts HTTP requests (Express/Node.js).
- **Flow**:
  1. **Signal Extraction**: Parses headers, IP, payload.
  2. **Session Identification**: Retrieves or initializes session state from Redis.
  3. **Risk Evaluation**: Orchestrates rules and AI checks.
  4. **Decision**: Maps Risk Score -> Enforcement Action.
  5. **Enforcement**: Executes Action (Allow, Block, etc.).
  6. **Logging**: Asynchronously logs details to MongoDB using Stable Event Schema.
- **Health Endpoints**:
  - `GET /health`: Basic liveness check.
  - `GET /ready`: Verified connectivity to Redis and MongoDB.

### 2.3 Signal Extractor (`src/core/signal-extractor.js`)
- **Responsibility**: Pure extraction and sanitization logic.
- **Inputs**: `req` object.
- **Outputs**: `SignalContext` object containing:
  - `ip`: Client IP.
  - `userAgent`: Raw UA string.
  - `fingerprint`: Hash of stable headers (UA, Accept-Language, etc.).
  - `route`: Request path and method.
  - `timestamp`: Request time.
  - `payloadMetadata`: Size, content-type, basic structure analysis.
- **Sanitization**: Strips sensitive headers (Auth tokens, Cookies) from metadata to prevent log leaks.

### 2.4 Session Manager (`src/core/session-manager.js`)
- **Storage**: Redis.
- **Schema (Redis Hash)**:
  - Key: `maf:sess:{sessionId}`
  - Fields:
    - `lastFingerprint`: String.
    - `lastIpRegion`: String.
    - `riskScore`: Computed rolling risk score.
    - `history`: JSON list of recent request timestamps/metadata (sliding window).

### 2.5 Risk Engine (`src/core/risk-engine.js`)
- **Responsibility**: Calculates numeric risk score (0-100).
- **Logic**:
  - **Deterministic Rules**: Device Change, Velocity, Geo-Hopping.
  - **AI Analysis (Optional)**: Triggered if Rule Risk is ambiguous.
- **Output**: `RiskResult` { score: number, reasons: string[] }.

### 2.6 AI Adapter (`src/core/ai-adapter.js`)
- **Features**:
  - **Timeouts**: Strict timeout (e.g., 2000ms) to prevent latency spikes.
  - **Retries**: Configurable retry logic with backoff.
  - **Circuit Breaker**: Auto-disable AI if error rate exceeds threshold.
  - **Guardrails**: Enforces maximum AI calls per session/time window to prevent abuse and cost escalation.
  - **Budgeting**: Track token usage/cost.

### 2.7 Decision Engine (`src/core/decision-engine.js`)
- **Responsibility**: Maps `RiskResult` to `EnforcementAction`.
- **Inputs**: `RiskResult`, `Config`.
- **Enforcement Actions**:
  - `ALLOW`: Pass request.
  - `BLOCK`: Return 403 Forbidden.
  - `DROP_SESSION`: Return 403 + Clear Session.
  - `CHALLENGE`: Request is temporarily blocked until secondary verification (e.g., re-auth or CAPTCHA).

### 2.8 Replay Engine (`src/core/replay-engine.js`)
- **Responsibility**: Re-evaluates past events against *current* rules.
- **Method**: `replayEvent(eventId)`.
- **Logic**: Fetches event -> Extracts Metadata -> Runs `RiskEngine` -> Runs `DecisionEngine` -> Returns Diff.

### 2.9 Logger (`src/core/logger.js`)
- **Storage**: MongoDB.
- **Collection**: `security_events`.
- **Performance**: Fire-and-forget (async).
- **Schema**: Enforces **Stable Event Schema** to ensure replayability.

---

## 3. Data Schemas

### 3.1 Log Event Schema (MongoDB)
```json
{
  "eventId": "uuid",
  "timestamp": "ISO8601",
  "sessionId": "hash(session_id)",
  "ip": "1.2.3.4",
  "region": "US",
  "fingerprint": "a1b2c3...",
  "route": "/api/v1/login",
  "method": "POST",
  "riskScore": 85,
  "decision": "BLOCK",
  "factors": ["device_change", "high_velocity"],
  "aiAnalysis": {
    "enabled": true,
    "suggestion": "Likely bot",
    "confidence": 0.9,
    "latency": 450
  },
  "metadata": {
    "userAgent": "Mozilla/5.0..."
  }
}
```

## 4. Configuration Parameters

The system is configured via `src/config/index.js` which loads Environment Variables.

| Variable | Description | Default |
| :--- | :--- | :--- |
| `MAF_MODE` | Enforcement mode: `MONITOR`, `BLOCK`, `DROP` | `MONITOR` |
| `MAF_AI_ENABLED` | Enable AI analysis | `false` |
| `MAF_AI_PROVIDER` | AI Provider (e.g., `openrouter`) | - |
| `MAF_AI_API_KEY` | API Key for AI Provider | - |
| `REDIS_URL` | Redis Connection String | `redis://localhost:6379` |
| `MONGO_URL` | MongoDB Connection String | `mongodb://localhost:27017/maf` |
| `DASHBOARD_PORT` | Port for Dashboard API | `3001` |
| `RISK_THRESHOLD_BLOCK` | Score above which to block (0-100) | `80` |

## 5. Dashboard API Endpoints

- `GET /api/events`
  - Query Params: `limit`, `offset`, `minRisk`, `sessionId`.
  - Returns: List of events.

- `POST /api/replay/:eventId`
  - Action: Invokes `ReplayEngine`.
  - Returns: `{ originalDecision, newDecision, difference }`.
  
- `GET /health` / `GET /ready`
  - Operations methods for liveness and readiness.

**Security Logic:** Dashboard access protected via admin authentication and runs on a separate port.
