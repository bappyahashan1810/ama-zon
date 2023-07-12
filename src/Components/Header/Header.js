import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>

                <NavLink className={({ isActive }) => isActive ? 'bg-lime-800' : undefined} to="/">Shopping</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>
        </nav>
    );
};

export default Header;