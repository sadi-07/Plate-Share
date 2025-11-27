import React from 'react';
import { Link, NavLink } from 'react-router';
import Button from '../Componennts/Button';
import Title from '../Componennts/Title';
import logo from '../assets/Logo.png'

const Navbar = () => {

    const links = <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/availableFoods">Available Foods</NavLink>
    </>
    return (
        <div className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {/* links */}
                        {links}
                    </ul>
                </div>
                <Link to="/"><Title level={4} className='flex items-center'><img className='h-16 w-16 inline' src={logo} alt="" /><h3 className='text-3xl font-bold inline'>Plate Share</h3></Title></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-lg text-gray-600 gap-8">
                    {/* links */}
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <Button className='hover:cursor-pointer hover:scale-103' variant='primary'>Log In</Button>
            </div>
        </div>
    );
};

export default Navbar;