import {Dispatch} from "redux";
import axios from "axios";

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: null, // количество колод
    created: null,
    updated: null,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: '',
}
type InitialStateType = typeof initialState

export const restorePassReducer = (state: InitialStateType = initialState, action: AuthMeType): InitialStateType => {
    switch (action.type) {
        case "AAAAA":{
            return {...state, ...action.profile}
        }
        default:
            return state
    }
}

type AuthMeType = ReturnType<typeof authMe>
export const authMe = (profile: InitialStateType) => ({type: "AAAAA",profile }as const)


export const SendInstructionEmail = () => (dispatch:Dispatch) => {
   // return  axios.post<any>(`https://neko-back.herokuapp.com/2.0/auth/me`).then(res=>console.log(res.data))
}