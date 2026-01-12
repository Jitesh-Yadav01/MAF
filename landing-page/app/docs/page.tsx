import { DocsSection } from "@/components/docs/docs-section";

export default function DocsPage() {
    return (
        <div className="space-y-12">
            <div className="border-b border-border/50 pb-8 mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Documentation</h1>
                <p className="text-xl text-muted-foreground">
                    Complete guide to integrating and using MAF (Model Application Firewall) to secure your applications.
                </p>
            </div>

            <DocsSection id="introduction" title="Introduction">
                <p className="lead">
                    MAF is an AI-assisted backend security service that <strong className="text-foreground">validates every incoming request</strong> at the application layer.
                </p>
                <p>
                    In modern web architecture, backend requests cannot be trusted blindly. Traditional WAFs operate at the network edge but often lack context about the application's internal logic or user session state.
                </p>
                <p>
                    MAF solves this by sitting closer to your application logic (or continuously communicating with it), preventing session abuse, device spoofing, malicious payloads, API abuse, automation attacks, and insider misuse.
                </p>
                <div className="my-6 p-4 border border-blue-500/20 bg-blue-500/10 rounded-lg">
                    <p className="text-sm font-medium text-blue-200">
                        <strong>Key Differentiator:</strong> Unlike network WAFs, MAF is <em>application-aware</em> and <em>session-aware</em>, allowing for much more granular and deterministic security decisions.
                    </p>
                </div>
            </DocsSection>

            <DocsSection id="how-maf-works" title="How MAF Works">
                <h3>High-Level Request Flow</h3>
                <div className="bg-muted/50 p-6 rounded-lg font-mono text-sm my-4 border border-border">
                    Client &rarr; <span className="text-yellow-500">Backend Middleware</span> &rarr; <span className="text-primary font-bold">MAF Engine</span> &rarr; Decision &rarr; Backend Logic
                </div>
                <p>
                    When a request hits your backend (via our middleware or SDK), MAF intercepts it to perform real-time analysis before any business logic is executed.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Signal Extraction:</strong> We extract high-fidelity signals from the request metadata, headers, device fingerprint, and behavioral patterns.</li>
                    <li><strong>Session Validation:</strong> Depending on configuration, we validate the continuity of the session against known history.</li>
                    <li><strong>Risk Scoring:</strong> A deterministic score is calculated based on active rules. If the score exceeds a threshold, AI agents can be optionally engaged for deeper analysis.</li>
                    <li><strong>Enforcement:</strong> MAF returns a decision: <code>ALLOW</code>, <code>BLOCK</code>, or <code>DROP_SESSION</code>.</li>
                </ul>
                <p className="mt-4">
                    The architecture is <strong>rules-first, AI-optional</strong>. This ensures millisecond-latency for 99% of requests, with AI only stepping in for high-risk anomalies.
                </p>
            </DocsSection>

            <DocsSection id="core-features" title="Core Features">
                <div className="grid md:grid-cols-2 gap-6 not-prose">
                    <FeatureCard
                        title="Session Continuity Validation"
                        description="Prevents session hijacking by analyzing token usage patterns and device consistency."
                    />
                    <FeatureCard
                        title="Device Spoofing Detection"
                        description="Identifies mismatched signatures between the user agent, network signals, and historical device fingerprints."
                    />
                    <FeatureCard
                        title="Malicious Payload Detection"
                        description="Scans bodies and params for SQLi, XSS, and other common attack vectors before they reach your DB."
                    />
                    <FeatureCard
                        title="API Abuse Protection"
                        description="Rate limiting and pattern recognition to stop automation attacks and scrapers."
                    />
                </div>
                <div className="mt-6">
                    <h3>Real-time Enforcement</h3>
                    <p>
                        Decisions are made in real-time. You can configure responses to simply log (Monitor Mode) or actively block threats. All decisions are replayable and explainable via the dashboard.
                    </p>
                </div>
            </DocsSection>

            <DocsSection id="architecture-overview" title="Architecture Overview">
                <p>
                    MAF is designed to be unobtrusive yet powerful. The system consists of three main components:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Middleware / SDK:</strong> Sits in your API service (e.g., Express, Fastify, Next.js). It forwards metadata to the MAF Engine.</li>
                    <li><strong>MAF Engine:</strong> The core decision maker. Uses <span className="text-foreground font-mono text-xs bg-muted px-1 py-0.5 rounded">Redis</span> for hot session state and fast rule lookups.</li>
                    <li><strong>Audit Layer:</strong> <span className="text-foreground font-mono text-xs bg-muted px-1 py-0.5 rounded">Postgres</span> stores detailed logs for every request. An optional <strong>Blockchain Anchor</strong> service provides immutable proof of logs for compliance.</li>
                </ol>
                <p className="mt-4 text-sm text-muted-foreground">
                    <em>Note: The AI Adapter is an isolated service that is only invoked when deterministic rules flag a potential, but unconfirmed, threat.</em>
                </p>
            </DocsSection>

            <DocsSection id="integration-overview" title="Integration Overview">
                <p>
                    We prioritize a developer-friendly integration process. Currently, we support Node.js environments with first-party middleware for common frameworks.
                </p>
                <div className="my-4">
                    <pre className="p-4 rounded-lg bg-black/50 border border-border">
                        <code>{`// Example Express.js Integration
import { maf } from '@maf/sdk';

app.use(maf.middleware({
    apiKey: process.env.MAF_API_KEY,
    mode: 'monitor' // Start safely
}));`}</code>
                    </pre>
                </div>
                <p>
                    Typical rollout strategy:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li><strong>Day 1:</strong> Integrate Monitor Mode. No user impact.</li>
                    <li><strong>Day 2-3:</strong> Tune rules based on dashboard insights.</li>
                    <li><strong>Day 4:</strong> Switch to Block Mode for high-confidence rules.</li>
                </ul>
            </DocsSection>

            <DocsSection id="enforcement-modes" title="Enforcement Modes">
                <p>MAF operates in one of three modes, configurable per-environment or per-route.</p>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                        <h4 className="font-bold text-lg">1. Monitor Mode</h4>
                        <p className="text-muted-foreground">All requests are allowed. Threats are logged asynchronously. Perfect for initial setup and debugging.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                        <h4 className="font-bold text-lg">2. Block Mode</h4>
                        <p className="text-muted-foreground">High-risk requests are blocked immediately with a <code>403 Forbidden</code> or <code>401 Unauthorized</code> response.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-background/50">
                        <h4 className="font-bold text-lg">3. Session Drop Mode</h4>
                        <p className="text-muted-foreground">For severe violations (e.g., confirmed session hijacking), the session is invalidated globally, forcing re-authentication.</p>
                    </div>
                </div>
            </DocsSection>

            <DocsSection id="developer-dashboard" title="Developer Dashboard">
                <p>
                    The dashboard is a standalone application that runs on a separate port (local dev) or hosted cloud URL (prod).
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Live Feed:</strong> Watch requests come in real-time with risk scores.</li>
                    <li><strong>Attack Replay:</strong> Re-run a past request against current rules to see if it would still be blocked.</li>
                    <li><strong>Forensics:</strong> Deep dive into specific blocked requests to see exactly <em>why</em> they were flagged (e.g., "User Agent mismatch + High Velocity").</li>
                </ul>
            </DocsSection>

            <DocsSection id="security-privacy" title="Security & Privacy">
                <div className="flex flex-col gap-4">
                    <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-lg">
                        <h4 className="font-bold text-green-400 mb-2">No Raw Secrets</h4>
                        <p className="text-sm">MAF creates hashes of sensitive data (like passwords or PII) before they leave your infrastructure. We never store raw secrets.</p>
                    </div>
                    <div>
                        <p>
                            We offer <strong>On-Prem / Self-Host</strong> support for enterprise requirements, ensuring data never leaves your VPC.
                        </p>
                        <p>
                            Our audit trails are compliance-ready, suitable for SOC2 and ISO27001 requirements.
                        </p>
                    </div>
                </div>
            </DocsSection>

            <DocsSection id="faqs" title="FAQs">
                <div className="space-y-6">
                    <FAQItem question="How is this different from a WAF?">
                        WAFs protect the network edge. MAF protects the application logic. We understand users, sessions, and business rules, not just IP addresses and packets.
                    </FAQItem>
                    <FAQItem question="Does MAF add latency?">
                        Minimal. In deterministic mode, overhead is &lt;5ms. Optional AI analysis runs asynchronously or only on high-risk triggers.
                    </FAQItem>
                    <FAQItem question="Can this run without AI?">
                        Yes. The core engine is deterministic. AI is an optional add-on for advanced threat hunting.
                    </FAQItem>
                    <FAQItem question="Is blockchain mandatory?">
                        No. It is an optional feature for customers requiring immutable audit trails.
                    </FAQItem>
                </div>
            </DocsSection>
        </div>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <h4 className="font-semibold mb-2 text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    );
}

function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
    return (
        <div>
            <h4 className="font-bold text-foreground mb-1">{question}</h4>
            <p className="text-muted-foreground">{children}</p>
        </div>
    );
}
