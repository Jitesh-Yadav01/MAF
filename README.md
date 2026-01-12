# MAF - Application-Level Request Security

Intercept malicious requests before they reach your business logic. Prevent session hijacking, device spoofing, and API abuse with a single robust SDK.

## How It Works

1. **Request Interception**  
   Every request is paused before execution. We analyze headers, payload, and fingerprint against session history in Redis.

2. **Limit & Risk Scoring**  
   Deterministic rules evaluate velocity and entropy. AI agents flag high-risk anomalies for deeper inspection.

3. **Enforcement & Audit**  
   Malicious actors are blocked instantly. All decisions are logged to Postgres with optional blockchain anchoring.

## Core Capabilities

### Session Hijacking & Replay
Detects inconsistencies in cookie signatures and IP variance. Prevents attackers from using stolen auth tokens.

### Credential Stuffing
Identifies and blocks high-velocity login attempts across distributed request sources. Protects user accounts from takeover.

### API Abuse & Automation
Rate limits malicious bots based on behavioral fingerprints, not just IP addresses. Stops scrapers and brute-force agents.

## Dashboard for Developers

- **Live Traffic Monitoring**: Watch requests as they are analyzed in real-time.
- **Explainability**: See exactly *why* a request was blocked with risk score breakdowns.
- **System Health**: Monitor auto-scaling status and operational metrics.

## Immutable Audit Logs

- **Tamper-Proof**: All decisions logged to Postgres.
- **Blockchain Anchoring**: Optional audit trail integrity.
- **Forensics**: AES-256 encrypted logs for deep investigation.

## Agentic & Smarter Firewall

- **Explainable AI**: Every decision comes with a reasoning trace, not just a block signal.
- **Behavioral Analysis**: Agents evaluate entropy and velocity to flag zero-day anomalies.
- **Context-Aware**: Fingerprints users against session history.

