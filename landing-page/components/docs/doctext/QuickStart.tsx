import { DocsSection } from "@/components/docs/docs-section";

export function QuickStart() {
    return (
        <DocsSection id="quick-start" title="Quick Start">
            <h3>Installation</h3>
            <div className="my-4">
                <pre className="p-4 rounded-lg bg-black/50 border border-border overflow-x-auto">
                    <code className="tex-sm">npm install maf-security</code>
                </pre>
            </div>
            <h3>Basic Configuration</h3>
            <p className="mb-4">Initialize the MAF client in your application entry point.</p>
            <div className="my-4">
                <pre className="p-4 rounded-lg bg-black/50 border border-border">
                    <code>{`import { MAF } from 'maf-security';

const maf = new MAF({
apiKey: process.env.MAF_API_KEY,
projectId: 'p_12345678',
environment: 'production'
});

// Use as middleware
app.use(maf.expressMiddleware());`}</code>
                </pre>
            </div>
        </DocsSection>
    );
}
