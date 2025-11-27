import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className='border-b border-gray-400'>
            <Navbar />
            </div>
            <div className="p-6">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;