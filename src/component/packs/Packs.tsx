import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {useEffect} from "react";
import {getPack} from "../../reducers/packReducer";
import {Paper} from "@material-ui/core";
import style from "./newPack/newTable/table/CustomTable.module.css";
import {InterfacePack} from "./newPack/newTable/interfacePack/InterfacePack";

export const Packs = () => {
    const dispatch = useDispatch()
    const pageSize = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)

    useEffect(() => {
        dispatch(getPack({pageCount: pageSize, page}))
    }, [])

    return (
        <div>
            <Paper className={style.ContainerTable} elevation={3}>
                <div className={style.content}>
                    <h2>Packs list</h2>
                    <InterfacePack/>
                </div>
            </Paper>
        </div>
    )
}
