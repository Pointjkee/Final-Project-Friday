import React from 'react';
import './App.css';
import Header from "./component/header/Header";
import RoutesC from "./component/routes/RoutesC";
import {Preloader} from "./common/preloader/Preloader";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {RequestStatusType} from "./reducers/appReducer";




function App() {
    const status = useSelector<AppRootStateType,RequestStatusType>(state=>state.app.status);

   /* if(status === 'loading'){
        return  <Preloader/>
    }
*/
    return (
        <div className="App">
            <Header/>
            <RoutesC/>
        </div>
    )
}

export default App;
