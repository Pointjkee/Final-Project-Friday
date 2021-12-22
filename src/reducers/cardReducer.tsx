import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    cards:[] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: '' as string
}



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