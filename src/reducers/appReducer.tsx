
export type RequestStatusType = 'loading' | 'success' | 'failed'

export const initialState = {
    status: 'loading' as RequestStatusType,

}

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'APP/SET_STATUS', status} as const;
}

type ActionsType = SetAppStatusType

export type SetAppStatusType = ReturnType<typeof setAppStatus>
