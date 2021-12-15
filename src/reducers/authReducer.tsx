import {userAPI, LoginParamsType} from "../api/api";
import {Dispatch} from "redux";

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
    return (dispatch: Dispatch<ActionsType>) => {
        userAPI.login(data)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setIsLoggedInAC(true))
                }
            })
            .catch(e => {
                    const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
                    console.log(error)
                }
            )
    }
}