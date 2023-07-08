import React from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';

const Header = () => {
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <a href="/home">Home</a>
                <a href="/shopping">Shopping</a>
                <a href="/cart">Cart</a>
                <a href="/about">About</a>
            </div>
        </nav>
    );
};

export default Header;