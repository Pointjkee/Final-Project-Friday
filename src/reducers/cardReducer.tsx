import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";
import {Dispatch} from "redux";
import {cardsAPI} from "../api/api";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: Date
    updated: Date
    __v: number
    _id: string
}
export type InitialStateCardType = typeof initialState
type LoadingCardType =  'loading' | 'success' | 'error'

const initialState = {
    cards: [] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 4,
    packUserId: '' as string,
    loadingStatus: 'success' as LoadingCardType
}


export const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCard(state,action:PayloadAction<InitialStateCardType>){
            return action.payload
        },
        setPage(state,action:PayloadAction<{page:number}>){
            state.page = action.payload.page
        },
        resetCards(state,action:PayloadAction<{cards:CardType[],cardsTotalCount:number}>) {
           state.cards = action.payload.cards
            state.cardsTotalCount = action.payload.cardsTotalCount
        },
        statusCard(state,action:PayloadAction<{status:LoadingCardType}>){
          state.loadingStatus = action.payload.status
        },
    }
})

export const cardReducer = slice.reducer
export const {setCard,setPage,resetCards,statusCard} = slice.actions



export const getCards = (id: string | undefined) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState().card
    const page = state.page
    const pageCount = state.pageCount
    const minGrade = state.minGrade
    const maxGrade = state.maxGrade
    dispatch(statusCard({status:'loading'}))
  cardsAPI.getCards({
        cardsPack_id: id,
        page,
        pageCount,
        min: minGrade,
        max: maxGrade
    })
        .then(res => {
            if(res.data.cards.length !== 0)
                dispatch(setCard(res.data))
            dispatch(statusCard({status:'success'}))
        })
        .catch(error => {
            console.log(error)
        })

}


export const resetCardsTC = ()=>(dispatch:Dispatch)=>{
    dispatch(statusCard({status:'loading'}))
    dispatch(resetCards({cards:[],cardsTotalCount:0}))
}
