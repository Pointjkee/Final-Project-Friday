import {Button} from '@material-ui/core';
import React from 'react';
import {CardType} from "../../../reducers/cardReducer";
import s from './Card.module.css'
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";
import { Rating } from '@mui/material';


type PropsCardType = {
    cards: CardType[]
    profileId: string | null
}


const Card = ({cards, profileId}: PropsCardType) => {
    return (
        <tbody className={s.tableWrapper}>
        {cards && cards.map((t, index) =>
            <tr key={t.cardsPack_id} style={index % 2 === 0 ? {background: "white"} : {background: "#ECECF9"}}>
                <td>{t.question}</td>
                <td>{t.answer}</td>
                <td>
                    <Rating name="read-only" size="small" value={t.grade} readOnly /></td>
                <td>{new Date(t.updated).toLocaleDateString()}</td>
                {profileId === t.user_id ? <td className={s.tableButton}>
                    <div className={s.buttonWrapper}>
                        <Button
                            style={{width: "30%"}} size={"small"} variant={"contained"} color={'success'}><EditPopup answer={t.answer} _id={t._id} cardsPack_id={t.cardsPack_id}
                                                         question={t.question}/></Button>
                        <Button
                            style={{width: "30%"}}
                            size={"small"} variant={"contained"}
                                color={"error"}><DeletePopup cardsPack_id={t.cardsPack_id} cardId={t._id}/></Button>
                    </div>
                </td> : <td></td>}
            </tr>)}
        </tbody>
    );
};

export default Card;