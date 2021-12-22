
import {GetPackType, packAPI} from "../api/api";
import {Dispatch} from "redux";


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

export const getPack = () => (dispatch: Dispatch) => {
    packAPI.getPack().then(res => {
        dispatch(setStatePack(res.data))
    })
}
