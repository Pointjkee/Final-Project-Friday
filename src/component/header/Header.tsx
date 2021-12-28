import React from 'react';
import s from './Header.module.css'
import {NavLink} from "react-router-dom";
import {ErrorAlert} from "../restorePassword/infoSentEmail/ErrorAlert";

const Header = () => {
    return (
        <div className={s.container}>
            <NavLink to='/login'> Login</NavLink>
            <NavLink to='/register'> Register</NavLink>
            <NavLink to='/profile'> Profile</NavLink>
            <ErrorAlert/>
            <NavLink to='/packs'> Packs</NavLink>
            <NavLink to='/404'> 404</NavLink>
        </div>
    );
};

export default Header;