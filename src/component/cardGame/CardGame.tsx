import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {gameInit, LoadingCardGameType, setMarkValue, setShowAnswer} from "../../reducers/cardGameReducer";
import {AppRootStateType} from "../../store/store";
import {CardType} from "../../reducers/cardReducer";
import {Rating} from "./raiting/Rating";
import {Preloader} from "../../common/preloader/Preloader";
import s from './CardGame.module.css'


export default function CardGame() {
    const {id} = useParams<{ id: string | undefined }>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const card = useSelector<AppRootStateType, CardType>(state => state.game.card)
    const status = useSelector<AppRootStateType, LoadingCardGameType>(state => state.game.cardGameStatus)
    const showAnswer = useSelector<AppRootStateType, boolean>(state => state.game.showAnswer)
    const markValue = useSelector<AppRootStateType, number>(state => state.game.markValue)


    useEffect(() => {
        dispatch(gameInit(id))
    }, [])

    const onSetValueClick = (value = 1 as number) => {
        dispatch(setMarkValue({markValue: value}))
    }

    const onSetShowAnswerClick = (value: boolean) => {
        dispatch(setShowAnswer({showAnswer: value}))
    }

    const onNextCardClick = () => {
        dispatch(gameInit(id))
    }

    const onCancelClick = () => {
        navigate(-1)
    }

    return <>
        <Modal
            open
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={s.container}>
                <div className={s.title}>
                    Learn Cards
                </div>
                {status === 'loading' ? <Preloader/> :
                    <div className={s.wrapper}>
                        <div className={s.question}>
                            Question: {card.question}
                        </div>
                        {showAnswer && <div>
                            <div className={s.answer}>Answer: {card.answer}</div>
                            <div className={s.rate}>Please rate question:
                                <div><Rating cardId={card._id} cardPack_id={id} value={markValue}
                                             setValue={onSetValueClick}/></div>
                            </div>
                        </div>}
                        <div className={s.buttonWrapper}>
                            {!showAnswer &&
                            <div className={s.buttonShow}>
                                <Button size='small' variant="contained" color='success'
                                        onClick={() => onSetShowAnswerClick(true)}>Show Answer</Button>
                            </div>}
                            <div className={s.buttonFooter}>
                                <div className={s.button}>
                                    <Button onClick={onNextCardClick} variant="contained" size='small'>Next</Button>
                                </div>
                                <div className={s.button}>
                                    <Button size='small' variant="contained" color='secondary'
                                            onClick={onCancelClick}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        </Modal>
    </>;
};
