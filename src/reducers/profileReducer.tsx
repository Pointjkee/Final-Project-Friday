import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {setAppStatus} from "./appReducer";
import {setIsLoggedInAC} from "./authReducer";
import {SetProfileType} from "../api/types";


export type ActionTypes = ReturnType<typeof setProfile>

export type ProfileResponseType ={
    _id: string | null;
    email: string | null;
    name: string
    avatar?: string | null
    publicCardPacksCount: number | null
    created: Date | null
    updated: Date | null
    isAdmin: boolean | null
    verified: boolean | null
    rememberMe: boolean | null
    error?: string | null
}

const initialState = {
    profile: {
        _id: null as string | null,
        email: null as string | null,
        name: '',
        avatar: null as string | null,
        publicCardPacksCount: null as number | null,
        created: null as Date | null,
        updated: null as Date | null,
        isAdmin: null as boolean | null,
        verified: null as boolean | null,
        rememberMe: null as boolean | null,
        error: null as string | null,
    }
}


export type InitialStateTypeProfile = typeof initialState

export const profileReducer = (state: InitialStateTypeProfile = initialState, action: ActionTypes): InitialStateTypeProfile => {
    switch (action.type) {
        case 'SET_PROFILE':
       return {...state,profile: {...state.profile,...action.profile}}
        default:
            return state
    }
}


export const setProfile = (profile:ProfileResponseType) =>({
    type: "SET_PROFILE", profile
} as const )



export const editProfile = (data:SetProfileType) => (dispatch:Dispatch)=>{
        dispatch(setAppStatus('loading'))
    profileAPI.setProfile(data)
        .then(res =>{
            dispatch(setProfile(res.data.updatedUser))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('success'))
        })
        .catch(e =>{
            const error = e.response ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            dispatch(setAppStatus('failed'))
        })

}


