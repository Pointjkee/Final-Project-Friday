import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";
import {Dispatch} from "redux";
import {cardsAPI} from "../api/api";
import {NewCardsType, UpdateCardType} from "../api/types";

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
    loadingStatus: 'success' as LoadingCardType,
    cardError: ''
}


export const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCards(state,action:PayloadAction<InitialStateCardType>){
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
        setError(state,action:PayloadAction<{error:string}>){
            state.cardError = action.payload.error
        }
    }
})

export const cardReducer = slice.reducer
export const {setCards,setPage,resetCards,statusCard,setError} = slice.actions



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
                dispatch(setCards(res.data))
                dispatch(statusCard({status:'success'}))
        })
        .catch(error => {
            console.log(error)
            dispatch(setError({error:error}))
            dispatch(statusCard({status:'error'}))
        })

}

export const resetCardsTC = ()=>(dispatch:Dispatch)=>{
    dispatch(statusCard({status:'loading'}))
    dispatch(resetCards({cards:[],cardsTotalCount:0}))
}

export const setCard = (card:NewCardsType)=>(dispatch:Dispatch<any>)=>{
    dispatch(statusCard({status:'loading'}))
    cardsAPI.setCards(card)
        .then(res=>{
            dispatch(getCards(card.cardsPack_id))
            }
        )
        .catch(error=>{
            console.log(error)
            dispatch(setError({error:error}))
            dispatch(statusCard({status:'error'}))
        })
}

export const updateCard =(updateCard:UpdateCardType,cardsPack_id:string)=>(dispatch:Dispatch<any>)=>{
    dispatch(statusCard({status:'loading'}))
    cardsAPI.updateCard(updateCard)
        .then(res=>{
            dispatch(getCards(cardsPack_id))
        })
        .catch(error=>{
            console.log(error)
            dispatch(setError({error:error}))
            dispatch(statusCard({status:'error'}))
        })
}


export const deleteCard =(cardId:string,cardsPack_id:string)=>(dispatch:Dispatch<any>)=>{
    dispatch(statusCard({status:'loading'}))
    cardsAPI.deleteCard(cardId)
        .then(res=>{
            dispatch(getCards(cardsPack_id))
        })
        .catch(error=>{
            console.log(error)
            dispatch(setError({error:error}))
            dispatch(statusCard({status:'error'}))
        })
}
