import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock, Globe, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../layout/DashboardLayout';

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
    if (status === 'ALLOW') color = 'text-[var(--status-success)] border-[var(--status-success)]';
    if (status === 'BLOCK') color = 'text-[var(--status-error)] border-[var(--status-error)]';
    if (status === 'DROP_SESSION') color = 'text-tertiary border-tertiary';

    return (
        <span className={`px-2 py-0.5 text-[10px] border rounded-full ${color} bg-transparent font-medium`}>
            {status}
        </span>
    );
};

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const [stats, setStats] = useState({ total: 0, blocked: 0, threats: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            // Fetch Stats
            const statsRes = await fetch('/api/stats', { headers: { 'Authorization': 'admin' } });
            if (statsRes.ok) {
                const data = await statsRes.json();
                setStats(data);
            }

            // Fetch Events
            const eventsRes = await fetch('/api/events?limit=20', { headers: { 'Authorization': 'admin' } });
            if (eventsRes.ok) {
                const data = await eventsRes.json();
                setEvents(data);
                processChartData(data);
            }
        } catch (e) {
            console.error('Failed to fetch data', e);
        }
    };

    const processChartData = (events) => {
        const buckets = {};
        events.forEach(evt => {
            const date = new Date(evt.timestamp);
            const key = `${date.getHours()}:00`;
            if (!buckets[key]) buckets[key] = { time: key, total: 0, errors: 0 };
            buckets[key].total++;
            if (evt.aiDecision === 'BLOCK') buckets[key].errors++;
        });
        
        const sorted = Object.values(buckets).sort((a, b) => parseInt(a.time) - parseInt(b.time));
        setChartData(sorted);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 pb-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary">Security Overview</h1>
                    <div className="flex gap-1 bg-white border border-default rounded-md p-1 shadow-sm">
                        <button className="px-3 py-1.5 text-xs font-medium bg-[var(--bg-active)] rounded-sm text-primary shadow-sm border border-[var(--border-default)]">Live</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Total Requests" value={stats.total} trend="Live" trendUp icon={Globe} />
                    <StatCard label="Threats Blocked" value={stats.blocked} trend={`${((stats.blocked/stats.total)*100 || 0).toFixed(1)}%`} trendUp={false} icon={AlertTriangle} />
                    <StatCard label="Active Threats" value={stats.threats} trend="Detection" trendUp icon={Clock} />
                </div>

                <div className="card p-5">
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-primary">Traffic Inspection (Hourly)</h3>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
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
                                <Area type="monotone" dataKey="errors" stroke="#DC2626" strokeWidth={1.5} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <div className="p-5 border-b border-subtle flex justify-between items-center bg-[var(--bg-panel)] rounded-t-lg">
                        <h3 className="text-sm font-medium text-primary">Recent Security Events</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-subtle text-secondary font-medium">
                                    <th className="px-5 py-3 font-medium w-full">Time</th>
                                    <th className="px-5 py-3 font-medium">IP</th>
                                    <th className="px-5 py-3 font-medium">Path</th>
                                    <th className="px-5 py-3 font-medium">Threat</th>
                                    <th className="px-5 py-3 font-medium text-right">Decision</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.slice(0, 5).map((evt, i) => (
                                    <tr key={i} className="border-b border-subtle last:border-0 hover:bg-[var(--bg-hover)] transition-colors group">
                                        <td className="px-5 py-3 font-medium text-primary">
                                            {new Date(evt.timestamp).toLocaleTimeString()}
                                        </td>
                                        <td className="px-5 py-3 text-secondary text-xs font-mono">{evt.ip || 'Unknown'}</td>
                                        <td className="px-5 py-3 text-secondary text-xs">{evt.method} {evt.path}</td>
                                        <td className="px-5 py-3 text-red-600 font-medium">{evt.threat || '-'}</td>
                                        <td className="px-5 py-3 text-right"><Badge status={evt.aiDecision} /></td>
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
