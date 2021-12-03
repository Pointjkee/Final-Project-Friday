import React from 'react';
import './App.css';
import SuperButton from './common/superButton/SuperButton';
import SuperCheckbox from './common/superCheckbox/SuperCheckbox';
import SuperInputText from "./common/superInputText/SuperInputText";
import {Navigate, Route, Routes} from "react-router-dom";
import {Test} from "./Test";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<div>1</div>}/>
                <Route path='login' element={<div>Login</div>}/>
                <Route path="register" element={<div>Register</div>}/>
                <Route path="profile" element={<div>Profile</div>}/>
                <Route path="newpassword" element={<div>New Password</div>}/>
                <Route path="test" element={<Test/>}/>
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>

        </div>
    )
}

export default App;
