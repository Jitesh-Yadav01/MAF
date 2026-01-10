import React from 'react';
import { LayoutGrid, Shield, Activity, Settings, FileText, Lock, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`
        flex items-center px-4 py-3 cursor-pointer transition-all mx-3 rounded-md border
        ${active
                    ? 'bg-[var(--bg-active)] border-[var(--border-default)]'
                    : 'border-transparent hover:bg-[var(--bg-hover)] hover:border-[var(--border-subtle)]'
                }
      `}
            style={{
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
        >
            <Icon size={18} strokeWidth={1.5} className="mr-3" />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
};

export const Sidebar = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <aside className="h-full bg-panel border-r border-default flex flex-col w-80 flex-shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-subtle">
                <div className="w-6 h-6 rounded mr-3 bg-gray-900 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-primary leading-tight">MAF</span>
                    <span className="text-[10px] text-secondary font-medium tracking-tight">Model App Firewall</span>
                </div>
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close navigation"
                        className="sidebar-close-btn ml-auto"
                    >
                        <X size={16} strokeWidth={1.5} />
                    </button>
                )}
            </div>

            <div className="flex-1 py-6 flex flex-col gap-2 px-3">
                <div className="px-3 py-2 mb-1">
                    <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Protection</span>
                </div>
                <SidebarItem icon={LayoutGrid} label="Overview" path="/" active={isActive('/')} onClick={() => navigate('/')} />
                <SidebarItem icon={Shield} label="Policies" path="/policies" active={isActive('/policies')} onClick={() => navigate('/policies')} />
                <SidebarItem icon={Activity} label="Threat Logs" path="/logs" active={isActive('/logs')} onClick={() => navigate('/logs')} />
                <SidebarItem icon={FileText} label="Model Registry" path="/models" active={isActive('/models')} onClick={() => navigate('/models')} />

                <div className="mt-6 px-3 py-2 mb-1">
                    <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Configuration</span>
                </div>
                <SidebarItem icon={Lock} label="Access Control" path="/access" active={isActive('/access')} onClick={() => navigate('/access')} />
                <SidebarItem icon={Settings} label="Settings" path="/settings" active={isActive('/settings')} onClick={() => navigate('/settings')} />
            </div>

            <div className="p-4 border-t border-subtle">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border border-default"></div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-primary">Dev User</span>
                        <span className="text-xs text-secondary">Pro Plan</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};
