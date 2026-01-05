import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Navbar />
            <main className="flex-grow pt-20"> {/* pt-20 to account for fixed navbar */}
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
