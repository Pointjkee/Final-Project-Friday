import { Button } from '@material-ui/core';
import React from 'react';
import {CardType} from "../../../reducers/cardReducer";
import s from './Card.module.css'


type PropsCardType = {
    cards: CardType[]
    profileId:string | null
}


const Card = ({cards,profileId}: PropsCardType) => {
    return (
        <tbody className={s.tableWrapper}>
            {cards && cards.map((t,index) =>
                <tr  key={t.cardsPack_id} style={index % 2 === 0 ? {background: "white"} : {background: "#ECECF9"}}>
                    <td >{t.question}</td>
                    <td>{t.answer}</td>
                    <td>{t.grade.toFixed(1)}</td>
                    <td>{new Date(t.updated).toLocaleDateString()}</td>
                    {profileId === t.user_id ? <td><div>
                        <Button>Update</Button>
                        <Button>Delete</Button>
                    </div> </td>: <td></td>}
                </tr>)}
        </tbody>
    );
};

export default Card;