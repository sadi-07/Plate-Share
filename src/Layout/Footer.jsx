import React from 'react';
import logo from '../assets/Logo Footer.png'
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FaEarthAsia } from 'react-icons/fa6';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className=''>
            <div className='bg-primary'>
                <footer className="footer sm:footer-horizontal text-gray-100 p-10 max-w-7xl mx-auto px-4 md:px-0">
                    <aside>
                        <img className='h-20 w-22' src={logo} alt="" />
                        <p className='text-4xl font-bold'>
                            Plate Share
                            <br />
                            <span className='text-lg font-semibold'>Providing Foods to the needy since 2004</span>
                        </p>
                    </aside>
                    <nav>
                        <h3 className="text-2xl font-semibold text-gray-100">Social</h3>
                        <div className="grid grid-flow-col gap-6">
                            <Link to="https://github.com/sadi-07" className='text-4xl'>
                                <FaGithub />
                            </Link>
                            <Link to="" className='text-4xl'>
                                <FaFacebook />
                            </Link>
                            <Link to="" className='text-4xl'>
                                <BsTwitterX />
                            </Link>
                        </div>
                    </nav>
                </footer>
                    <h2 className='text-center pb-3 text-gray-200'>© 2025; All rights reserved by Khaled Mahmud Sadi</h2>
            </div>
        </div>
    );
};

export default Footer;