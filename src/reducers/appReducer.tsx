export type RequestStatusType = 'loading' | 'success' | 'failed'

export const initialState = {
    status: 'loading' as RequestStatusType,
    isMePack: true

}

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/ME-PACK-STATUS': {
            return {...state, isMePack: action.mePack}
        }
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'APP/SET_STATUS', status} as const;
}

export const changeMePackStatus = (mePack: boolean) => {
    return {type: 'APP/ME-PACK-STATUS', mePack} as const;
}

type ActionsType = SetAppStatusType| ChangeMePackStatusType

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type ChangeMePackStatusType = ReturnType<typeof changeMePackStatus>
