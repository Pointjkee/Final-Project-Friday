import {Button} from '@material-ui/core';
import React from 'react';
import {CardType} from "../../../reducers/cardReducer";
import s from './Card.module.css'
import EditPopup from "../popup/EditPopup";
import DeletePopup from "../popup/DeletePopup";


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
                <td>{t.grade.toFixed(1)}</td>
                <td>{new Date(t.updated).toLocaleDateString()}</td>
                {profileId === t.user_id ? <td className={s.tableButton}>
                    <div className={s.buttonWrapper}>
                        <Button
                            size={"small"} variant={"contained"}
                            color={"success"}><EditPopup answer={t.answer} _id={t._id} cardsPack_id={t.cardsPack_id}
                                                         question={t.question}/></Button>
                        <Button size={"small"} variant={"contained"}
                                color={"error"}><DeletePopup cardsPack_id={t.cardsPack_id} cardId={t._id}/></Button>
                    </div>
                </td> : <td></td>}
            </tr>)}
        </tbody>
    );
};

export default Card;