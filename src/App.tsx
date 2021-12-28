import React, {useEffect} from 'react';
import './App.css';
import Header from "./component/header/Header";
import RoutesC from "./component/routes/RoutesC";
import {Preloader} from "./common/preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {RequestStatusType} from "./reducers/appReducer";
import {authMe} from "./reducers/authReducer";


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(authMe())
    }, [])

    if (status === 'loading') {
        return <Preloader/>
    }

    return (
        <div className="App">
            <RoutesC/>
        </div>
    )
}

export default App;
