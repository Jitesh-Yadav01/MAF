import React from 'react';
import { Search, Bell } from 'lucide-react';

export const Header = () => {
    return (

        <header className="h-16 border-b border-default bg-panel flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-3 w-full max-w-sm px-3 py-2 rounded-md border border-[var(--border-default)] transition-colors focus-within:border-[var(--accent-primary)] bg-[var(--bg-app)]">
                <Search size={16} className="text-tertiary" />
                <input
                    type="text"
                    placeholder="Search resources..."
                    className="border-none bg-transparent p-0 text-sm w-full placeholder:text-tertiary focus:outline-none"
                    style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 rounded-md border border-transparent hover:border-[var(--border-default)] hover:bg-[var(--bg-hover)] text-secondary hover:text-primary transition-all">
                    <Bell size={18} strokeWidth={1.5} />
                </button>
                <div className="w-8 h-8 rounded-full bg-gray-200 border border-[var(--border-default)] cursor-pointer hover:border-[var(--accent-primary)] transition-colors"></div>
            </div>

        </header>
    )
}
