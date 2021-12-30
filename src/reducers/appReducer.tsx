export type RequestStatusType = 'loading' | 'success' | 'failed'

export const initialState = {
    status: 'success' as RequestStatusType,
    statusPack: 'success' as RequestStatusType,
    isMePack: true,
    disabledSort: false,
    sortPacks:"",
    errorMessage: "",
}

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-PACK-STATUS-LOADER': {
            return {...state, statusPack: action.packStatus}
        }
        case 'APP/CHANGE-STATUS-DISABLED': {
            return {...state, disabledSort: action.disabledSort}
        }
        case 'APP/SORT-TYPE': {
            return {...state, sortPacks: action.typeSort}
        }
        case 'APP/ME-PACK-STATUS': {
            return {...state, isMePack: action.mePack}
        }
        case 'APP/SET-ERROR-MESSAGE': {
            return {...state, errorMessage: action.error}
        }
        default:
            return state
    }
}


export const setErrorMessage = (error: string) => {
    return {type: 'APP/SET-ERROR-MESSAGE', error} as const
}

export const setAppStatus = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const;
}
export const setPackStatus = (packStatus: RequestStatusType) => {
    return {type: 'APP/SET-PACK-STATUS-LOADER', packStatus} as const;
}

export const changeMePackStatus = (mePack: boolean) => {
    return {type: 'APP/ME-PACK-STATUS', mePack} as const;
}

export const changeDisabledStatus = (disabledSort: boolean) => {
    return {type: 'APP/CHANGE-STATUS-DISABLED', disabledSort} as const;
}
export const typeSortChange = (typeSort: string) => {
    return {type: 'APP/SORT-TYPE', typeSort} as const;
}

type ActionsType = SetAppStatusType| ChangeMePackStatusType|ChangeDisabledStatusType|TypeSortChangeType|SetPackStatusType|SetErrorMessageType

type SetErrorMessageType = ReturnType<typeof setErrorMessage>
export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetPackStatusType = ReturnType<typeof setPackStatus>
export type ChangeDisabledStatusType = ReturnType<typeof changeDisabledStatus>
export type TypeSortChangeType = ReturnType<typeof typeSortChange>
export type ChangeMePackStatusType = ReturnType<typeof changeMePackStatus>
