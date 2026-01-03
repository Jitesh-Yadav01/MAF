import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ArrowUpDown, Filter } from 'lucide-react';

const Badge = ({ status }) => {
    let color = 'text-secondary border-secondary';
    if (status === 'ALLOW') color = 'text-[var(--status-success)] border-[var(--status-success)]';
    if (status === 'BLOCK') color = 'text-[var(--status-error)] border-[var(--status-error)]';

    return (
        <span className={`px-2 py-0.5 text-[10px] border rounded-full ${color} bg-transparent font-medium`}>
            {status}
        </span>
    );
};

export default function ThreatLogs() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

    useEffect(() => {
        fetch('/api/events?limit=50', { headers: { 'Authorization': 'admin' } })
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getFilteredAndSortedEvents = () => {
        let filtered = events;

        if (filter !== 'ALL') {
            filtered = events.filter(evt => evt.aiDecision === filter);
        }

        return filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    const displayedEvents = getFilteredAndSortedEvents();

    const SortIcon = ({ column }) => (
        <ArrowUpDown
            size={14}
            className={`cursor-pointer hover:text-primary ${sortConfig.key === column ? 'text-primary' : 'text-tertiary'}`}
            onClick={() => handleSort(column)}
        />
    );

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 pb-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-primary">Threat Logs</h1>

                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-secondary" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-panel border border-default text-sm text-primary rounded-md px-3 py-1.5 focus:outline-none focus:border-focus"
                        >
                            <option value="ALL">All Events</option>
                            <option value="BLOCK">Blocked Only</option>
                            <option value="ALLOW">Allowed Only</option>
                        </select>
                    </div>
                </div>

                <div className="card p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[var(--bg-panel)] border-b border-subtle">
                                <tr>
                                    <th className="px-5 py-3 font-medium select-none">Time <SortIcon column="timestamp" /></th>
                                    <th className="px-5 py-3 font-medium select-none">IP <SortIcon column="ip" /></th>
                                    <th className="px-5 py-3 font-medium select-none">Path</th>
                                    <th className="px-5 py-3 font-medium select-none">Threat Type</th>
                                    <th className="px-5 py-3 font-medium select-none">AI Reasoning</th>
                                    <th className="px-5 py-3 font-medium select-none">Action <SortIcon column="aiDecision" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedEvents.length > 0 ? (
                                    displayedEvents.map((evt, i) => (
                                        <tr key={i} className="border-b border-subtle last:border-0 hover:bg-[var(--bg-hover)] transition-colors">
                                            <td className="px-5 py-3 text-secondary">{new Date(evt.timestamp).toLocaleString()}</td>
                                            <td className="px-5 py-3 font-mono text-xs text-primary">{evt.ip || 'Unknown'}</td>
                                            <td className="px-5 py-3 font-mono text-xs text-secondary">{evt.method} {evt.path}</td>
                                            <td className="px-5 py-3 font-medium text-red-600">{evt.threat || '-'}</td>
                                            <td className="px-5 py-3 text-secondary whitespace-normal min-w-[300px]">{evt.aiReason}</td>
                                            <td className="px-5 py-3"><Badge status={evt.aiDecision} /></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-5 py-8 text-center text-secondary">
                                            No events found matching current filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
