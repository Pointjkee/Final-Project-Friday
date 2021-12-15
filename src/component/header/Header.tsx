import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <div className={s.container}>
            <NavLink to='/login'> Login</NavLink>
            <NavLink to='/register'> Register</NavLink>
            <NavLink to='/profile'> Profile</NavLink>
            <NavLink to='/newpassword'> Create new password</NavLink>
            <NavLink to='/restore'> Restore password</NavLink>
            <NavLink to='/test'> Test</NavLink>
            <NavLink to='/404'> 404</NavLink>
        </div>
    );
};

export default Header;