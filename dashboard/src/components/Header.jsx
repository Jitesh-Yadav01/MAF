import React from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';

export const Header = ({ onMenuToggle, sidebarOpen }) => {
    return (
        <header className="h-16 border-b border-default bg-panel flex items-center justify-between gap-3 px-5 md:px-6 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={onMenuToggle} className="menu-btn" aria-label="Open navigation">
                        <Menu size={18} />
                    </button>
                    {sidebarOpen && (
                        <button
                            type="button"
                            onClick={onMenuToggle}
                            className="menu-btn"
                            aria-label="Close navigation"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
                <div className="header-search flex items-center gap-3 px-3 py-2 rounded-md border border-[var(--border-default)] transition-colors focus-within:border-[var(--accent-primary)] bg-[var(--bg-app)]">
                    <Search size={16} className="text-tertiary" />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        className="border-none bg-transparent p-0 text-sm w-full placeholder:text-tertiary focus:outline-none"
                        style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                    />
                </div>
            </div>
            <div className="header-actions flex items-center gap-2">
                <button className="p-2 rounded-md border border-transparent hover:border-[var(--border-default)] hover:bg-[var(--bg-hover)] text-secondary hover:text-primary transition-all">
                    <Bell size={18} strokeWidth={1.5} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-[var(--border-default)] cursor-pointer hover:border-[var(--accent-primary)] transition-colors"></div>
            </div>

        </header>
    )
}
