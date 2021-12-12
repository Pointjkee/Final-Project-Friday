import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {Test} from "./Test";
import {RestorePassword} from "./component/restorePassword/RestorePassword";


function App() {

    return (
        <div className="App">
            <div><NavLink to='/login'> Go to login</NavLink></div>
            <div><NavLink to='/register'> Go to Register</NavLink></div>
            <div><NavLink to='/profile'> Go to Profile</NavLink></div>
            <div><NavLink to='/newpassword'> Go to create new password</NavLink></div>
            <div><NavLink to='/restore'> Go to restore password</NavLink></div>
            <div><NavLink to='/test'> Go to test</NavLink></div>
            <div><NavLink to='/404'> Go to 404</NavLink></div>
            <Routes>
                <Route path='/' element={<div>default</div>}/>
                <Route path='login' element={<div>Login</div>}/>
                <Route path="register" element={<div>Register</div>}/>
                <Route path="profile" element={<div>Profile</div>}/>
                <Route path="restore" element={<div><RestorePassword/></div>}/>
                <Route path="newpassword" element={<div>New Password</div>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>

        </div>
    )
}

export default App;
