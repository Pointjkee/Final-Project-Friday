export type RequestStatusType = 'loading' | 'success' | 'failed'

export const initialState = {
    status: 'loading' as RequestStatusType,
    isMePack: true,
    disabledSort: false,
    sortPacks:""

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
        case 'APP/CHANGE-STATUS-DISABLED': {
            return {...state, disabledSort: action.disabledSort}
        }
        case 'APP/SORT-TYPE': {
            return {...state, sortPacks: action.typeSort}
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

export const changeDisabledStatus = (disabledSort: boolean) => {
    return {type: 'APP/CHANGE-STATUS-DISABLED', disabledSort} as const;
}
export const typeSortChange = (typeSort: string) => {
    return {type: 'APP/SORT-TYPE', typeSort} as const;
}

type ActionsType = SetAppStatusType| ChangeMePackStatusType|ChangeDisabledStatusType|TypeSortChangeType

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type ChangeDisabledStatusType = ReturnType<typeof changeDisabledStatus>
export type TypeSortChangeType = ReturnType<typeof typeSortChange>
export type ChangeMePackStatusType = ReturnType<typeof changeMePackStatus>
