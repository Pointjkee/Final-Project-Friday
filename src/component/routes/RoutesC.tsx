import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Register} from "../register/Register";
import {RestorePassword} from "../restorePassword/RestorePassword";
import Profile from "../profile/Profile";
import {Login} from "../login/Login";
import {NewPassword} from "../newPassword/newPassword";
import {InfoSentEmail} from "../restorePassword/infoSentEmail/InfoSentEmail";
import {Packs} from "../packs/Packs";
import {CardsTable} from "../cards/CardsTable";
import CardGame from "../cardGame/CardGame";


const RoutesC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Profile/>}/>
                <Route path='login' element={<div><Login/></div>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="restore" element={<RestorePassword/>}/>
                <Route path="/set-new-password/:token" element={<NewPassword/>}/>
                <Route path="info-sent-email" element={<InfoSentEmail/>}/>
                <Route path="packs" element={<Packs/>}/>
                <Route path="cards/:id" element={<CardsTable/>}/>
                <Route path="game/:id" element={<CardGame/>} />
                <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
            </Routes>
        </div>
    );
};

export default RoutesC;