import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppRootStateType} from "../store/store";
import {Dispatch} from "redux";
import {setAppStatus} from "./appReducer";
import {cardsAPI} from "../api/api";


const initialState = {
    cards:[] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '' as string
}

export type InitialStateCardType = typeof initialState

export const slice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        setCard(state, action:PayloadAction<typeof initialState>){
            state = action.payload
        },

    }
})

export const cardReducer = slice.reducer
export const {setCard} = slice.actions

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

export const getCards = (id:string) =>(dispatch:Dispatch,getState: ()=> AppRootStateType)=>{
    const state = getState().card
    const page = state.page
    const pageCount = state.pageCount
    const minGrade = state.minGrade
    const maxGrade = state.maxGrade
    /*dispatch(setAppStatus('loading'))*/
    console.log(id)
    cardsAPI.getCards({
        cardsPack_id:id,
        page,
        pageCount,
        min: minGrade,
        max: maxGrade
    })
        .then(res => {
           dispatch( setCard(res.data))
            dispatch(setAppStatus('success'))
        })
        .catch(error =>{
            console.log(error)
        })
}