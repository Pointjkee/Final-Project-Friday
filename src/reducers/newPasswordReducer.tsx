import {Dispatch} from "redux";
import {userAPI} from "../api/api";

const initialState = {

}
type InitialStateType = typeof initialState

export const newPasswordReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const changePassword = (newPassword: ChangePasswordType) => (dispatch:Dispatch) => {
        userAPI.changePassword(newPassword)
            .then(res=>{

            })
}

export type ChangePasswordType={
    password: string
    resetPasswordToken: string|undefined
}
