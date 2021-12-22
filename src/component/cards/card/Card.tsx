import React from 'react';
import {CardType} from "../../../reducers/cardReducer";


type PropsCardType = {
    cards: CardType[]
}


const Card = ({cards}: PropsCardType) => {
    return (
        <tbody>
            {cards && cards.map(t =>
                <tr key={t.cardsPack_id}>
                    <td>{t.question}</td>
                    <td>{t.answer}</td>
                    <td>{t.grade.toFixed(1)}</td>
                    <td>{new Date(t.updated).toLocaleDateString()}</td>
                </tr>)}
        </tbody>
    );
};

export default Card;