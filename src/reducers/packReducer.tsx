import {GetPackType, packAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store/store";


const initialState = {
    cardPacks: [
        {
            _id: '',
            user_id: '',
            name: '',
            path: '',
            cardsCount: 0,
            grade: 0,
            shots: 0,
            rating: 0,
            type: '',
            created: '',
            updated: '',
            __v: 0,
        },
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}
export type cardPacksType =
    { _id: string; user_id: string; name: string; path: string; cardsCount: number; grade: number; shots: number; rating: number; type: string; created: string; updated: string; __v: number; }[]



export type InitialStateTypeProfile = typeof initialState

export const packReducer = (state: InitialStateTypeProfile = initialState, action: SetPackType): InitialStateTypeProfile => {
    switch (action.type) {
        case "PACK/SET-PACK": {
            // debugger
            return {...state, cardPacks: action.data.cardPacks}
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