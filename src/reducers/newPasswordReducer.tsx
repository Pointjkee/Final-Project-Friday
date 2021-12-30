import {Dispatch} from "redux";
import {userAPI} from "../api/api";
import {setErrorMessage} from "./appReducer";


const initialState = {
    statusNewPassword: false
}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: ChangePasswordActionsType): InitialStateType => {
    switch (action.type) {
        case "NEW-PASSWORD/CHANGE-STATUS-PASSWORD":{
            return {...state, statusNewPassword: action.status}
        }
        default:
            return state
    }
}

export type ChangePasswordActionsType = NewPasswordType

type NewPasswordType = ReturnType<typeof statusPasswordChange>
export const statusPasswordChange = (status: boolean) => ({type:"NEW-PASSWORD/CHANGE-STATUS-PASSWORD", status} as const)

export const changePassword = (newPassword: ChangePasswordType) => (dispatch:Dispatch) => {
        userAPI.changePassword(newPassword)
            .then(res=>{
                    dispatch(statusPasswordChange(true))
            })
            .catch(error => {
                if (error.response.status === 404 || error.response.status === 401) {
                    dispatch(setErrorMessage(error.response.data.error))
                }
            })
}

export type ChangePasswordType={
    password: string
    resetPasswordToken: string|undefined
}
