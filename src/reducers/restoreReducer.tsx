import {Dispatch} from "redux";
import {userAPI} from "../api/api";


const initialState = {
    statusOfSentMessage: false,
    error: "",
    email: "",
}
type InitialStateType = typeof initialState

export const restorePassReducer = (state: InitialStateType = initialState, action: ActionRestoreType): InitialStateType => {
    switch (action.type) {
        case "RESTORE/CHANGE-STATUS-MESSAGE": {
            return {...state, statusOfSentMessage: action.status}
        }
        case "RESTORE/ERROR-MESSAGE": {
            return {...state, error: action.error}
        }
        case "RESTORE/SET-EMAIL": {
            return {...state, email: action.email}
        }
        default:
            return state
    }
}

export type ActionRestoreType = StatusMessageType | ErrorMessageEmailType | SetEmailType
type StatusMessageType = ReturnType<typeof changeStatusMessage>
export const changeStatusMessage = (status: boolean) => ({type: "RESTORE/CHANGE-STATUS-MESSAGE", status} as const)

type ErrorMessageEmailType = ReturnType<typeof errorMessageEmail>
export const errorMessageEmail = (error: string) => ({type: "RESTORE/ERROR-MESSAGE", error} as const)

type SetEmailType = ReturnType<typeof setEmail>
export const setEmail = (email: string) => ({type: "RESTORE/SET-EMAIL", email} as const)


export const SendInstructionToEmail = (forgot: ForgotType) => (dispatch: Dispatch) => {
    userAPI.restorePassword(forgot)
        .then((res) => {
            if (res.status === 200)
                dispatch(setEmail(forgot.email))
                dispatch(changeStatusMessage(true))
        })
        .catch(error => {
                if (error.response.status === 404 || error.response.status === 401) {
                    dispatch(errorMessageEmail(error.response.data.error))
                }
            }
        )
}


export type ForgotType = {
    email: string
    from: string
    message: string
}