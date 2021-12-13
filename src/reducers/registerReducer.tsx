import {Dispatch} from "redux"
import {userAPI} from "../api/api"

const initialState = {
    error: null,
    isRegister: false
}
type initialStateType = {
    error: string | null,
    isRegister: boolean
}
// type InitialStateType = typeof initialState
type ActionType = registerACType | setErrorACType

export const registerReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'REGISTER': {
            return {...state, isRegister: action.isRegister}
        }
        case 'SET_ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}
type registerACType = ReturnType<typeof registerAC>

const registerAC = () => {
    return {type: 'REGISTER', isRegister: true} as const
}

type setErrorACType = ReturnType<typeof setErrorAC>

const setErrorAC = (error: string | null) => {
    return {type: 'SET_ERROR', error} as const
}
export const registerThunk = (email: string, password: string) => (dispatch: Dispatch) => {
    userAPI.register(email, password)
        .then((res) => {
            dispatch(registerAC())
        })
        .catch((error) => {
            if (error.response.status === 400) {
                dispatch(setErrorAC(error.response.data.error))
            }
        })
}