import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {gameInit, LoadingCardGameType, setMarkValue, setShowAnswer} from "../../reducers/cardGameReducer";
import {AppRootStateType} from "../../store/store";
import {CardType} from "../../reducers/cardReducer";
import {Rating} from "./raiting/Rating";
import {Preloader} from "../../common/preloader/Preloader";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


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

    const onSetValueClick = (value: number) => {
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

    return (<>
            <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Learn Cards
                    </Typography>
                    {status === 'loading' ? <Preloader/> : <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div>
                            Question: {card.question}
                        </div>
                        {showAnswer && <div>
                            <div>Answer: {card.answer}</div>
                            <div>Please rate question:
                                <div><Rating cardId={card._id} cardPack_id={id} value={markValue}
                                             setValue={onSetValueClick}/></div>
                            </div>
                        </div>}
                        <span>
                         {!showAnswer &&
                         <Button size='small' onClick={() => onSetShowAnswerClick(true)}>Show Answer</Button>}
                            <Button onClick={onNextCardClick} size='small'>Next</Button>
                          <Button size='small' onClick={onCancelClick}>Cancel</Button>
                      </span>
                    </Typography>}
                </Box>
            </Modal>
        </>
    );
};
