import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/UserContext';

const Header = () => {
    const { userLogOut, user } = useContext(AuthContext);

    const handlerUserLogout = () => {
        userLogOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>

                <NavLink className={({ isActive }) => isActive ? 'bg-lime-800' : undefined} to="/">Shopping</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/inventory">Inventory</NavLink>
                <NavLink to="/about">About</NavLink>
                {
                    user?.email ? <button onClick={handlerUserLogout} className="btn btn-sm">Logout</button>
                        :
                        <>
                            <NavLink to="/login">Login</NavLink>
                            <NavLink to="/signup">SignUp</NavLink>
                        </>
                }

            </div>
        </nav>
    );
};

export default Header;