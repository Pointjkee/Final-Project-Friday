import {combineReducers} from "redux";
import {authReducer} from "../reducers/authReducer";
import thunkMiddleware from 'redux-thunk'
import {registerReducer} from "../reducers/registerReducer";
import {profileReducer} from "../reducers/profileReducer";
import {restorePassReducer} from "../reducers/restoreReducer";
import {newPasswordReducer} from "../reducers/newPasswordReducer";
import {appReducer} from "../reducers/appReducer";
import {configureStore} from "@reduxjs/toolkit";
import {packReducer} from "../reducers/packReducer";
import {cardReducer} from "../reducers/cardReducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    restorePass: restorePassReducer,
    newPass: newPasswordReducer,
    pack: packReducer,
    card: cardReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware().prepend(thunkMiddleware)]
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;