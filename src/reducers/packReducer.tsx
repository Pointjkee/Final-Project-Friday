import {GetPackType, packAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store/store";


const initialState = {}


export type InitialStateTypeProfile = typeof initialState

export const packReducer = (state: InitialStateTypeProfile = initialState, action: SetPackType): InitialStateTypeProfile => {
    switch (action.type) {
        case "PACK/SET-PACK": {
            return {...state, ...action.data}
        }
        default:
            return state
    }
}

type SetPackType = ReturnType<typeof setStatePack>
export const setStatePack = (data: GetPackType) => ({type: "PACK/SET-PACK", data} as const)

export const getPack = (): PackThunkType => (dispatch) => {
    packAPI.getPack().then(res => {
        dispatch(setStatePack(res.data))
    })
}

export const addPack = (data?:PostPackType): PackThunkType => (dispatch) => {
    packAPI.postPack(data).then(() => {
        dispatch(getPack())
    })

}

export const deletePack = (id: string): PackThunkType => (dispatch) => {
    packAPI.deletePack(id).then(() => {
        dispatch(getPack())
    })
}


//  dispatch(updatePack({cardsPack:{_id:"61c2fd76b68c5b0004438b99"} })) вот так передавать в санку))
export const updatePack = (data: UpdatePackType): PackThunkType => (dispatch) => {
    packAPI.updatePack(data).then(()=> {
        dispatch(getPack())
    })
}

export type PackThunkType = ThunkAction<void, AppRootStateType, unknown, SetPackType>


export type UpdatePackType = {
    cardsPack: {
        _id: string
        name?: string
    }
}

export type PostPackType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: string
        private?: boolean
        type?: string
    }
}