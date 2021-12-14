import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Register} from "../register/Register";
import {RestorePassword} from "../restorePassword/RestorePassword";
import {Test} from "../../Test";
import Profile from "../profile/Profile";




const RoutesC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<div>default</div>}/>
                <Route path='login' element={<div>Login</div>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="restore" element={<RestorePassword/>}/>
                <Route path="newpassword" element={<div>New Password</div>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
};

export default RoutesC;