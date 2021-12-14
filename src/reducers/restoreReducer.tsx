import {Dispatch} from "redux";
import {userAPI} from "../api/api";

const initialState = {
    statusOfSentMessage: false
}
type InitialStateType = typeof initialState

export const restorePassReducer = (state: InitialStateType = initialState, action: ActionRestoreType): InitialStateType => {
    switch (action.type) {
        case "RESTORE/CHANGE-STATUS-MESSAGE": {
            return {...state, statusOfSentMessage: action.status}
        }
        default:
            return state
    }
}

export type ActionRestoreType = StatusMessageType
type StatusMessageType = ReturnType<typeof changeStatusMessage>
export const changeStatusMessage = (status: boolean) => ({type: "RESTORE/CHANGE-STATUS-MESSAGE",status} as const)


export const SendInstructionToEmail = (forgot: ForgotType) => (dispatch: Dispatch) => {
    userAPI.restorePassword(forgot)
        .then(res => {
            dispatch(changeStatusMessage(true))
        })
}


export type ForgotType = {
    email: string,
    from: string,
    message: string,
}