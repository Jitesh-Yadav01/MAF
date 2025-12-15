import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-app text-primary font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col h-full min-w-0">
                <Header />
                <main className="flex-1 overflow-auto p-6 scroll-smooth">
                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};
