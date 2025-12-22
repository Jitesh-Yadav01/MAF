import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';

export default function Placeholder({ title }) {
    return (
        <DashboardLayout>
             <div className="p-5">
                <h1 className="text-xl font-semibold text-primary mb-4">{title}</h1>
                <div className="card p-10 flex items-center justify-center border-dashed">
                    <span className="text-tertiary">This module is under development.</span>
                </div>
            </div>
        </DashboardLayout>
    );
}
