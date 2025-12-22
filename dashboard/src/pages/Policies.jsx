import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Shield, Fingerprint, AlertTriangle } from 'lucide-react';

const PolicyCard = ({ title, icon: Icon, children }) => (
    <div className="card p-5">
        <div className="flex items-center gap-3 mb-4 text-primary font-medium">
            <Icon size={20} className="text-secondary" />
            {title}
        </div>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const ConfigItem = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-subtle last:border-0">
        <span className="text-sm text-secondary">{label}</span>
        <span className="text-sm font-medium text-primary bg-[var(--bg-hover)] px-2 py-1 rounded">{value}</span>
    </div>
);

export default function Policies() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('/api/stats', { headers: { 'Authorization': 'admin' } })
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    // Placeholder config (In a real app, you'd fetch this from /api/config)
    const config = {
        mode: 'MONITOR',
        riskThresholdBlock: 80,
        riskThresholdDrop: 95,
        aiEnabled: false,
        sessionTtl: '3600s'
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 pb-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary">Security Policies</h1>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded text-xs font-medium">
                        Active Mode: {config.mode}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PolicyCard title="Risk Thresholds" icon={AlertTriangle}>
                        <ConfigItem label="Block Threshold" value={config.riskThresholdBlock} />
                        <ConfigItem label="Drop Threshold" value={config.riskThresholdDrop} />
                        <ConfigItem label="Velocity Limit" value="20 req/min" />
                    </PolicyCard>

                    <PolicyCard title="Session Control" icon={Fingerprint}>
                        <ConfigItem label="Session TTL" value={config.sessionTtl} />
                        <ConfigItem label="Fingerprinting" value="Enabled" />
                        <ConfigItem label="Storage" value="In-Memory" />
                    </PolicyCard>

                    <PolicyCard title="AI Analysis" icon={Shield}>
                        <ConfigItem label="AI Enabled" value={config.aiEnabled ? 'Yes' : 'No'} />
                        <ConfigItem label="Provider" value="OpenRouter" />
                        <ConfigItem label="Circuit Breaker" value="Active" />
                    </PolicyCard>
                </div>

                 <div className="card p-5">
                    <h3 className="text-sm font-medium text-primary mb-4">Rule Definitions</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[var(--bg-panel)] border-b border-subtle">
                                <tr>
                                    <th className="px-5 py-3 font-medium">Rule Name</th>
                                    <th className="px-5 py-3 font-medium">Risk Score</th>
                                    <th className="px-5 py-3 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-subtle">
                                    <td className="px-5 py-3">Device Change</td>
                                    <td className="px-5 py-3 text-red-600">+30</td>
                                    <td className="px-5 py-3">Flag</td>
                                </tr>
                                <tr className="border-b border-subtle">
                                    <td className="px-5 py-3">High Velocity</td>
                                    <td className="px-5 py-3 text-red-600">+40</td>
                                    <td className="px-5 py-3">Rate Limit</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-3">AI Suspicion</td>
                                    <td className="px-5 py-3 text-red-600">Dynamic</td>
                                    <td className="px-5 py-3">Block</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
