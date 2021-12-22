import React from 'react';
import s from './Card.module.css'
import {NavLink} from "react-router-dom";
import {CardType} from "../../../reducers/cardReducer";
import {Button} from "@mui/material";


type PropsCardType = {
    cards:  CardType[]
}



const Card = ({cards}:PropsCardType) => {
    return (
        <div>
            {cards && cards.map(t  =>
                <tr key={t.cardsPack_id}>
                    <td>{t.question}</td>
                    <td>{t.answer}</td>
                    <td>{t.grade.toFixed(1)}</td>
                    <td>{new Date(t.updated).toLocaleDateString()}</td>
                    {/*<td>{profileId === t.user_id && <SuperButton onClick={() => {
                        onDeleteCardModalHandler(t._id, t.cardsPack_id)
                    }}>DELETE</SuperButton>}
                        {profileId === t.user_id && <SuperButton onClick={() => {
                            onUpdateCardModalHandler(t._id, t.cardsPack_id, t.question, t.answer, t.grade)
                        }}>UPDATE</SuperButton>}</td>*/}
                </tr>)}
        </div>
    );
};

export default Card;