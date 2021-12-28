import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {useEffect} from "react";
import {getPack} from "../../reducers/packReducer";
import {Paper} from "@material-ui/core";
import style from "./newPack/newTable/table/CustomTable.module.css";
import {InterfacePack} from "./newPack/newTable/interfacePack/InterfacePack";
import {useNavigate} from "react-router-dom";
import {resetCardsTC} from "../../reducers/cardReducer";
import s from "../cards/CardsTable.module.css";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export const Packs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const meUserId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)
    const pageSize = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)
    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)

    let user_id = meUserId !== null && isMePack ? meUserId : "";

    useEffect(() => {
        dispatch(getPack({pageCount: pageSize, user_id}))
    }, [isMePack])

    const onBackClick = () => {
        navigate(-1)
        dispatch(resetCardsTC())
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
