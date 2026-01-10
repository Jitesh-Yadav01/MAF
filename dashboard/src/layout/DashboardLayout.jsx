import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

const getInitialSidebarState = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth >= 768;
    }
    return true;
};

export const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarState);
    const backdropClass = sidebarOpen ? 'sidebar-backdrop active' : 'sidebar-backdrop';

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const handler = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    const toggleSidebar = () => setSidebarOpen((value) => !value);

    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex h-screen bg-canvas overflow-hidden relative">
            <div className={`sidebar-panel ${sidebarOpen ? 'open' : ''}`}>
                <Sidebar onClose={closeSidebar} />
            </div>
            <div className={backdropClass} onClick={closeSidebar} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
