import React, {useEffect} from 'react';
import s from './CardsTable.module.css'
import Card from "./card/Card";
import {AppRootStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {CardType, getCards, InitialStateCardType, resetCardsTC, setPage} from "../../reducers/cardReducer";
import {useNavigate, useParams} from "react-router-dom";
import {Preloader} from "../../common/preloader/Preloader";
import {Alert, Button, Pagination} from "@mui/material";
import {ProfileResponseType} from "../../reducers/profileReducer";
import arrow from '../../assets/images/arrow.png'
import AddPopup from "./popup/AddPopup";


export const CardsTable = () => {
    const status = useSelector<AppRootStateType>(state => state.card.loadingStatus)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string | undefined }>()
    const cardTab = useSelector<AppRootStateType, InitialStateCardType>(state => state.card)
    const cards = useSelector<AppRootStateType, CardType[]>(state => state.card.cards)
    const profile = useSelector<AppRootStateType, ProfileResponseType>(state => state.profile.profile)
    const error = useSelector<AppRootStateType, string>(state => state.card.cardError)


    const {
        cardsTotalCount,
        maxGrade,
        minGrade,
        page,
        pageCount,
        packUserId,
    } = cardTab

    const {
        _id
    } = profile

    const totalCount = Math.round(cardsTotalCount / pageCount)

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setPage({page}))
    }

    const onBackClick = () => {
        navigate(-1)
        dispatch(resetCardsTC())
    }

    const onNavigateGameClick = () => {
        navigate('/game/' + id)
    }

    useEffect(() => {
        dispatch(getCards(id))
    }, [page])


    return (
        <div className={s.container}>
            {error && <Alert severity="error">{error}</Alert>}
            <div className={s.header__container}>
                <div className={s.arrow__container} onClick={onBackClick}>
                    <div className={s.arrow}><img src={arrow} alt="arrow"/></div>
                    <div className={s.arrow__title}>Back to Packs</div>
                </div>
                <div className={s.button}><Button variant={"contained"}><AddPopup cardsPack_id={id}
                                                                                  maxGrade={maxGrade}
                                                                                  minGrade={minGrade}/></Button></div>

            </div>

            {status === 'loading' ? <Preloader/> :
                <table className={s.table}>
                    <thead className={s.table_head}>
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Grade</th>
                        <th>Updated</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <Card
                        cards={cards}
                        profileId={_id}
                    />
                </table>}
            <div className={s.paginator}>
                {totalCount > 1 && <Pagination
                    onChange={handlePageChange}
                    count={totalCount}
                    color="secondary"/>}
            </div>
        </div>
    );
};

