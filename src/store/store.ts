import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "../reducers/authReducer";
import thunkMiddleware from 'redux-thunk'
import {registerReducer} from "../reducers/registerReducer";
import {profileReducer} from "../reducers/profileReducer";
import {restorePassReducer} from "../reducers/restoreReducer";
import {newPasswordReducer} from "../reducers/newPasswordReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    register: registerReducer,
    profile: profileReducer,
    restorePass: restorePassReducer,
    newPass: newPasswordReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;