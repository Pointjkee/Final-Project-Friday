import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {useEffect} from "react";
import {getPack} from "../../reducers/packReducer";
import {Paper} from "@material-ui/core";
import style from "./newPack/newTable/table/CustomTable.module.css";
import {InterfacePack} from "./newPack/newTable/interfacePack/InterfacePack";
import {Navigate, useNavigate} from "react-router-dom";
import {resetCardsTC} from "../../reducers/cardReducer";
import s from "../cards/CardsTable.module.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {changeDisabledStatus} from "../../reducers/appReducer";

export const Packs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const meUserId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)
    const min = useSelector<AppRootStateType, number>(s => s.pack.minCardsCount)
    const max = useSelector<AppRootStateType, number>(s => s.pack.maxCardsCount)
    const pageCount = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)
    const sortPacks = useSelector<AppRootStateType, string>(s => s.app.sortPacks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    let user_id = meUserId !== null && isMePack ? meUserId : "";

    useEffect(() => {
        dispatch(getPack({pageCount,sortPacks, min, max, user_id}))
    }, [isMePack])

    const onBackClick = () => {
        navigate(-1)
        dispatch(resetCardsTC())
        dispatch(changeDisabledStatus(false))

    }

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <div>
            <Paper className={style.ContainerTable} elevation={3}>
                <div className={style.content}>
                    <div className={s.arrow__container} onClick={onBackClick}>
                        <ArrowCircleLeftIcon color={"primary"}/> Back to Profile
                    </div>
                    <h1>Packs list</h1>
                    <InterfacePack/>
                </div>
            </Paper>
        </div>
    )
}
