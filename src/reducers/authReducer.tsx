import {LoginParamsType, userAPI} from "../api/api";
import {Dispatch} from "redux";
import {setProfile} from "./profileReducer";
import {setAppStatus} from "./appReducer";


type ActionsType = setIsLoggedInAT | errorTextResponseAT

type setIsLoggedInAT = {
    type: 'LOGIN',
    value: boolean
}
type errorTextResponseAT = {
    type: 'ERROR_TEXT_RESPONSE',
    errorText: string
}

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
    errorText: ''
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'ERROR_TEXT_RESPONSE':
            return {...state, errorText: action.errorText}
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean): setIsLoggedInAT => ({type: 'LOGIN', value} as const)
export const errorTextResp = (errorText: string) => ({type: 'ERROR_TEXT_RESPONSE', errorText} as const)

export const loginThunk = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        userAPI.login(data)
            .then((res) => {
                dispatch(setProfile(res.data))
                dispatch(setIsLoggedInAC(true))
            })
            .catch(e => {
                    const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                    dispatch(errorTextResp(error))
                }
            )
            .finally(() => {
                dispatch(setAppStatus('success'))
            })
    }
}


export const logOut = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    userAPI.logOut()
        .then(() => {
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
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(errorTextResp(error))
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
            dispatch(errorTextResp(error))
            dispatch(setAppStatus('failed'))
        })
}