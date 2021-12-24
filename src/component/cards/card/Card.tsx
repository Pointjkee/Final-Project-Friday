import { Button } from '@material-ui/core';
import React from 'react';
import {CardType} from "../../../reducers/cardReducer";



type PropsCardType = {
    cards: CardType[]
    profileId:string | null
}


const Card = ({cards,profileId}: PropsCardType) => {
    return (
        <tbody >
            {cards && cards.map(t =>
                <tr  key={t.cardsPack_id}>
                    <td >{t.question}</td>
                    <td>{t.answer}</td>
                    <td>{t.grade.toFixed(1)}</td>
                    <td>{new Date(t.updated).toLocaleDateString()}</td>
                    {profileId === t.user_id && <td><div>
                        <Button>Update</Button>
                        <Button>Delete</Button>
                    </div> </td>}
                </tr>)}
        </tbody>
    );
};

export default Card;