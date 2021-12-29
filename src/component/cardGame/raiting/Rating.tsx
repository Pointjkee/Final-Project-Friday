import React from 'react';
import {Star} from "./star/Star";
import s from './Rating.module.css'
import {useDispatch} from "react-redux";
import {setMark} from "../../../reducers/cardGameReducer";
import {Button} from "@mui/material";

type RatingPropsType = {
    cardId: string
    cardPack_id: string | undefined
    value: number
    setValue: (newValue: number) => void
}


export const Rating = ({cardId, cardPack_id, value, setValue}: RatingPropsType) => {

    const dispatch = useDispatch()

    const onConfirmClick = () => {
         dispatch(setMark(value, cardId, cardPack_id))
    }


    return (
        <div className={s.starWrapper}>
            <Star setValue={() => {
                setValue(1)
            }} select={value > 0}/>
            <Star setValue={() => {
                setValue(2)
            }} select={value > 1}/>
            <Star setValue={() => {
                setValue(3)
            }} select={value > 2}/>
            <Star setValue={() => {
                setValue(4)
            }} select={value > 3}/>
            <Star setValue={() => {
                setValue(5)
            }} select={value > 4}/>
            <div><Button onClick={onConfirmClick}>Confirm</Button></div>
        </div>
    );
};

