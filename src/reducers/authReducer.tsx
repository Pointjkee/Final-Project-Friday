import {userAPI, LoginParamsType} from "../api/api";
import {Dispatch} from "redux";
import {setProfile} from "./profileReducer";
import {setAppStatus} from "./appReducer";

type setIsLoggedInAT = {
    type: 'LOGIN',
    value: boolean
}
type ActionsType = setIsLoggedInAT

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean): setIsLoggedInAT => ({type: 'LOGIN', value} as const)

export const loginThunk = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        userAPI.login(data)
            .then((res) => {
                dispatch(setProfile(res.data))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatus('success'))
            })
            .catch(e => {
                    const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                    console.log(error)
                }
            )
    }
}


export const logOut = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    userAPI.logOut()
        .then(res => {
            dispatch(setProfile({
                    _id: null,
                    email: null,
                    name: '',
                    avatar: null,
                    publicCardPacksCount: null,
                    created: null,
                    updated: null,
                    isAdmin: null,
                    verified: null,
                    rememberMe: null,
                    error: null
                })
            )
            dispatch(setAppStatus('success'))
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
        })


}


export const authMe = () => (dispatch: Dispatch) => {
    userAPI.me()
        .then(res => {
            dispatch(setProfile(res.data))
            dispatch(setAppStatus('success'))
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            console.log(error)
            dispatch(setAppStatus('failed'))
        })
}