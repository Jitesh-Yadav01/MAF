import { DocsSection } from "@/components/docs/docs-section";

export function IntegrationOverview() {
    return (
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
    );
}
