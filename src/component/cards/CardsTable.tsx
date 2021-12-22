import React, {useEffect} from 'react';
import s from './CardsTable.module.css'
import Card from "./card/Card";
import {AppRootStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {getCards, InitialStateCardType} from "../../reducers/cardReducer";
import {useParams} from "react-router-dom";


export const CardsTable = () => {
    const cardTab = useSelector<AppRootStateType,InitialStateCardType>(state=>state.card)
    const dispatch = useDispatch()
    const {id} = useParams<{id:string}>()

    const {cards,
        cardsTotalCount,
        maxGrade,
        minGrade,
        page,
        pageCount,
        packUserId} = cardTab


    useEffect(()=>{
        // @ts-ignore
        dispatch(getCards(id))
    },[])

    return (
        <div>
            <table className={s.table}>
                <thead>
                <tr>
                    <th>Question
                        {/*<SortBtn property={'question'} sortStatus={tabletInfo.sortCards}
                                 onSortBtnHandler={onSortBtnHandler}/>*/}
                    </th>

                    <th>Answer
                        {/*<SortBtn property={'answer'} sortStatus={tabletInfo.sortCards}
                                 onSortBtnHandler={onSortBtnHandler}/>*/}
                    </th>
                    <th>Grade
                        {/*<SortBtn property={'grade'} sortStatus={tabletInfo.sortCards}
                                 onSortBtnHandler={onSortBtnHandler}/>*/}
                    </th>
                    <th>Updated
                       {/* <SortBtn property={'updated'} sortStatus={tabletInfo.sortCards}
                                 onSortBtnHandler={onSortBtnHandler}/>*/}
                    </th>
                    <th>Action</th>
                </tr>
                </thead>
               <Card cards={cards}/>
            </table>
        </div>
    );
};

