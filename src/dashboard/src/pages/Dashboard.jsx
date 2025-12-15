import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, ArrowDownRight, CheckCircle, AlertCircle, Clock, Globe, Activity, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../layout/DashboardLayout';

// Mock Data
const apiRequestsData = [
    { time: '00:00', total: 120, errors: 2 },
    { time: '04:00', total: 150, errors: 5 },
    { time: '08:00', total: 420, errors: 12 },
    { time: '12:00', total: 950, errors: 25 },
    { time: '16:00', total: 600, errors: 8 },
    { time: '20:00', total: 240, errors: 3 },
    { time: '23:59', total: 180, errors: 2 },
];

const errorTrendsData = [
    { time: 'Mon', GET: 12, POST: 5, DELETE: 1 },
    { time: 'Tue', GET: 15, POST: 8, DELETE: 0 },
    { time: 'Wed', GET: 8, POST: 2, DELETE: 2 },
    { time: 'Thu', GET: 22, POST: 10, DELETE: 4 },
    { time: 'Fri', GET: 18, POST: 15, DELETE: 2 },
    { time: 'Sat', GET: 5, POST: 2, DELETE: 0 },
    { time: 'Sun', GET: 4, POST: 1, DELETE: 0 },
];

const webhooksData = [
    { time: '10:00', latency: 45 },
    { time: '10:05', latency: 120 },
    { time: '10:10', latency: 55 },
    { time: '10:15', latency: 48 },
    { time: '10:20', latency: 320 },
    { time: '10:25', latency: 50 },
    { time: '10:30', latency: 45 },
    { time: '10:35', latency: 60 },
];

const apiVersions = [
    { version: 'Llama-Guard-v3', status: 'Active', released: '2 days ago', deprecation: '-' },
    { version: 'Prompt-Shield-v2', status: 'Active', released: '1 month ago', deprecation: 'Dec 2025' },
    { version: 'PII-Filter-Basic', status: 'Deprecated', released: '6 months ago', deprecation: 'June 2025' },
    { version: 'SQLi-V1-Legacy', status: 'Archived', released: '1 year ago', deprecation: 'Expired' },
];

const StatCard = ({ label, value, trend, icon: Icon, trendUp }) => (
    <div className="card p-5 flex flex-col gap-3 transition-shadow hover:shadow-md">
        <div className="flex items-center justify-between">
            <span className="text-secondary text-sm font-medium">{label}</span>
            <Icon size={16} className="text-tertiary" />
        </div>
        <div className="flex items-end items-center gap-2">
            <span className="text-3xl font-semibold text-primary">{value}</span>
            {trend && (
                <span className={`px-1.5 py-0.5 rounded textxs flex items-center gap-0.5 border ${trendUp ? 'bg-emerald-50 text-[var(--status-success)] border-emerald-100' : 'bg-red-50 text-[var(--status-error)] border-red-100'}`}>
                    {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </span>
            )}
        </div>
    </div>
);

const Badge = ({ status }) => {
    let color = 'text-secondary border-secondary';
    if (status === 'Active') color = 'text-[var(--status-success)] border-[var(--status-success)]';
    if (status === 'Deprecated') color = 'text-[var(--accent-primary)] border-[var(--status-error)] text-[var(--status-error)]';
    if (status === 'Archived') color = 'text-tertiary border-tertiary';

    return (
        <span className={`px-2 py-0.5 text-[10px] border rounded-full ${color} bg-transparent font-medium`}>
            {status}
        </span>
    );
};

export default function Dashboard() {
    const [selectedMethods, setSelectedMethods] = useState({ GET: true, POST: true, DELETE: true });

    const toggleMethod = (method) => {
        setSelectedMethods(prev => ({ ...prev, [method]: !prev[method] }));
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 pb-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary">Security Overview</h1>
                    <div className="flex gap-1 bg-white border border-default rounded-md p-1 shadow-sm">
                        <button className="px-3 py-1.5 text-xs font-medium bg-[var(--bg-active)] rounded-sm text-primary shadow-sm border border-[var(--border-default)]">24h</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors hover:bg-[var(--bg-hover)] rounded-sm">7d</button>
                        <button className="px-3 py-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors hover:bg-[var(--bg-hover)] rounded-sm">30d</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Scanned Prompts" value="2.4M" trend="12%" trendUp icon={Globe} />
                    <StatCard label="Threats Blocked" value="142" trend="2.4%" trendUp={false} icon={AlertTriangle} />
                    <StatCard label="Avg. Latency" value="45ms" trend="2ms" trendUp={false} icon={Clock} />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Main Traffic Chart */}
                    <div className="card p-5 lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-primary">Traffic Inspection</h3>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={apiRequestsData}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#111827" stopOpacity={0.05} />
                                            <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--bg-panel)', borderColor: 'var(--border-default)', fontSize: '12px', borderRadius: '4px', boxShadow: 'var(--shadow-sm)', color: 'var(--text-primary)' }}
                                        itemStyle={{ color: 'var(--text-primary)' }}
                                        cursor={{ stroke: 'var(--border-default)' }}
                                    />
                                    <Area type="monotone" dataKey="total" stroke="var(--text-primary)" strokeWidth={1.5} fillOpacity={1} fill="url(#colorTotal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Error Distribution */}
                    <div className="card p-5">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-medium text-primary">Blocked Threats</h3>
                            <div className="flex gap-3">
                                {['GET', 'POST', 'DELETE'].map(method => (
                                    <label key={method} className="flex items-center gap-1.5 cursor-pointer select-none group">
                                        <div className={`w-3 h-3 rounded-[2px] border ${selectedMethods[method] ? 'bg-current border-current' : 'border-[var(--border-focus)]'}`}
                                            style={{ color: method === 'DELETE' ? '#DC2626' : method === 'POST' ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                                        >
                                            {selectedMethods[method] && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" className="w-full h-full p-[1px]">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedMethods[method]}
                                            onChange={() => toggleMethod(method)}
                                            className="hidden"
                                        />
                                        <span className="text-xs text-secondary font-medium group-hover:text-primary transition-colors">
                                            {method === 'GET' ? 'Injection' : method === 'POST' ? 'Jailbreak' : 'PII'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={errorTrendsData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }} />
                                    <Tooltip cursor={{ stroke: 'var(--border-default)' }} contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-default)' }} />
                                    {selectedMethods.GET && <Line type="monotone" dataKey="GET" stroke="var(--text-secondary)" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />}
                                    {selectedMethods.POST && <Line type="monotone" dataKey="POST" stroke="var(--text-primary)" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />}
                                    {selectedMethods.DELETE && <Line type="monotone" dataKey="DELETE" stroke="#DC2626" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Webhook Response Times */}
                    <div className="card p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-primary">Rule Latency</h3>
                            <div className="flex gap-3 text-xs text-secondary bg-[var(--bg-hover)] px-2 py-1 rounded-sm">
                                <span>Min: <span className="text-primary font-medium">45ms</span></span>
                                <span>Avg: <span className="text-primary font-medium">120ms</span></span>
                                <span>Max: <span className="text-primary font-medium">320ms</span></span>
                            </div>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={webhooksData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-subtle)" />
                                    <XAxis dataKey="time" hide />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }} />
                                    <Tooltip cursor={{ stroke: 'var(--border-default)' }} contentStyle={{ fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-default)' }} />
                                    <Line type="step" dataKey="latency" stroke="var(--accent-primary)" strokeWidth={1.5} dot={false} activeDot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* API Versions Table */}
                <div className="card">
                    <div className="p-5 border-b border-subtle flex justify-between items-center bg-[var(--bg-panel)] rounded-t-lg">
                        <h3 className="text-sm font-medium text-primary">Active Policies</h3>
                        <button className="text-xs text-secondary hover:text-primary border border-default px-3 py-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-all">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-subtle text-secondary font-medium">
                                    <th className="px-5 py-3 font-medium w-full">Policy Name</th>
                                    <th className="px-5 py-3 font-medium">Status</th>
                                    <th className="px-5 py-3 font-medium">Release Date</th>
                                    <th className="px-5 py-3 font-medium text-right">Deprecation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apiVersions.map((v, i) => (
                                    <tr key={i} className="border-b border-subtle last:border-0 hover:bg-[var(--bg-hover)] transition-colors group">
                                        <td className="px-5 py-3 font-medium text-primary flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-slate-500 transition-colors"></div>
                                            {v.version}
                                        </td>
                                        <td className="px-5 py-3"><Badge status={v.status} /></td>
                                        <td className="px-5 py-3 text-secondary">{v.released}</td>
                                        <td className="px-5 py-3 text-secondary text-right">{v.deprecation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
