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



export const cardReducer = (state:InitialStateCardType=initialState, action: ActionsType):InitialStateCardType =>{
            switch(action.type){
                case "SET_CARD_INFO":
                    return action.data
                default:
                    return state
            }
}

export const setCard = (data:InitialStateCardType) =>{
    return {type:"SET_CARD_INFO", data} as const}


type ActionsType = ReturnType<typeof setCard>

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

export const getCards = (id:string|undefined) =>(dispatch:Dispatch,getState: ()=> AppRootStateType)=>{
    const state = getState().card
    const page = state.page
    const pageCount = state.pageCount
    const minGrade = state.minGrade
    const maxGrade = state.maxGrade
   /* dispatch(setAppStatus('loading'))*/
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