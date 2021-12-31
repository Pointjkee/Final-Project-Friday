import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CardType} from "./cardReducer";
import {Dispatch} from "react";
import {cardsAPI} from "../api/api";


const initialState = {
    card: {} as CardType,
    allCards: null as null | CardType | CardType[],
    cardGameStatus: 'success' as LoadingCardGameType,
    markValue: 0,
    showAnswer: false,
    gameError: '',

}

export type LoadingCardGameType = 'loading' | 'success' | 'error'


export const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGameStatus(state, action: PayloadAction<{ cardGameStatus: LoadingCardGameType }>) {
            state.cardGameStatus = action.payload.cardGameStatus
        },
        setMarkValue(state, action: PayloadAction<{ markValue: number }>) {
            state.markValue = action.payload.markValue
        },
        setShowAnswer(state, action: PayloadAction<{ showAnswer: boolean }>) {
            state.showAnswer = action.payload.showAnswer
        },
        setAllCards(state, action: PayloadAction<{ allCards: CardType | CardType[] }>) {
            state.allCards = action.payload.allCards
        },
        setCard(state, action: PayloadAction<{ card: CardType }>) {
            state.card = action.payload.card
        },
        setGameError(state, action: PayloadAction<{ gameError: string }>) {
            state.gameError = action.payload.gameError
        }
    }
})


export const cardGameReducer = slice.reducer
export const {setGameStatus, setMarkValue, setShowAnswer, setAllCards, setCard, setGameError} = slice.actions


export const gameInit = (cardsPack_id: string | undefined) => (dispatch: Dispatch<any>) => {
    dispatch(setGameStatus({cardGameStatus: 'loading'}))
    dispatch(setShowAnswer({showAnswer: false}))
    dispatch(setMarkValue({markValue: 0}))
    cardsAPI.getCards({cardsPack_id, page: 1, pageCount: 100})
        .then(res => {
            dispatch(setAllCards({allCards: res.data.cards}))
            dispatch(setCard({card: getCard(res.data.cards)}))
            dispatch(setGameStatus({cardGameStatus: 'success'}))
        })
        .catch(err => {
                console.log(err)
                dispatch(setGameError({gameError: err}))
                dispatch(setGameStatus({cardGameStatus: 'error'}))
            }
        )
}

export const setMark = (grade: number, cardId: string, cardPack_id: string | undefined) => (dispatch: Dispatch<any>) => {
    dispatch(setGameStatus({cardGameStatus: 'loading'}))
    cardsAPI.gradeCard(grade, cardId)
        .then(res => {
            dispatch(gameInit(cardPack_id))
            dispatch(setGameStatus({cardGameStatus: 'success'}))
        })
        .catch(err => {
            console.log(err)
            dispatch(setGameError({gameError: err}))
            dispatch(setGameStatus({cardGameStatus: 'error'}))
        })
}

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});


    return cards[res.id + 1];
}
