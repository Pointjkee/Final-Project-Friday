import React, {useEffect} from 'react';
import s from './CardsTable.module.css'
import Card from "./card/Card";
import {AppRootStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {CardType, getCards, InitialStateCardType} from "../../reducers/cardReducer";
import {useParams} from "react-router-dom";



export const CardsTable = () => {
   const {id} = useParams<{id:string|undefined}>()
    const dispatch = useDispatch()
    const cardTab = useSelector<AppRootStateType,InitialStateCardType>(state=>state.card)
    const cards = useSelector<AppRootStateType,CardType[]>(state => state.card.cards)

    const {
        cardsTotalCount,
        maxGrade,
        minGrade,
        page,
        pageCount,
        packUserId} = cardTab

    useEffect(()=>{
        dispatch(getCards(id))
    },[])

    return (
        <div>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Question
                    </th>

                    <th>Answer
                    </th>
                    <th>Grade

                    </th>
                    <th>Updated

                    </th>
                    <th>Action</th>
                </tr>
                </thead>
                <Card cards={cards}/>
            </table>

        </div>
    );
};

