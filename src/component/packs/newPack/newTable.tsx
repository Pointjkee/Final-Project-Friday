import * as React from 'react';
import style from './CustomTable.module.css'
import {Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from "@mui/icons-material/Search";
import {Row} from "./tableRow";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {cardPacksType, getPack} from "../../../reducers/packReducer";
import {AppRootStateType} from "../../../store/store";
import {PaginationComponent} from "./Pagination/PaginationComponent";

export const CustomTable = () => {
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType, cardPacksType>(s => s.pack.cardPacks)
    const pageSize = useSelector<AppRootStateType, number>(s=>s.pack.pageCount)
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)

    useEffect(() => {
        dispatch(getPack({pageCount: pageSize, page}))
    }, [pageSize])

    return (
        <div>
            <Paper className={style.ContainerTable} elevation={3}>
                <div className={style.content}>
                    <h2>Packs list</h2>
                    <div className={style.interface}>
                        <TextField/>
                        <Button variant={"contained"}>
                            <SearchIcon/>
                        </Button>
                    </div>
                    <Paper style={{boxShadow: "#bde0ea 10px 5px 10px"}}>
                        <div className={style.tableHeader}>
                            <div className={style.textHeader} style={{textAlign: "start"}}>Name</div>
                            <div className={style.textHeader} style={{width: "30%"}}>Cards</div>
                            <div className={style.textHeader} >Last Updated</div>
                            <div className={style.textHeader} style={{width: "100%"}}>Created by</div>
                            <div className={style.textHeader} style={{textAlign: "start", width: "80%"}}>Actions</div>
                        </div>

                        {cardPacks.map( (s,index) => {
                            return <div  style={index% 2 === 0  ? {background:"white"}: {background: "#ECECF9"}  }>
                                <Row
                                            key={s._id}
                                            name={s.name}
                                           cards={s.cardsCount}
                                           update={s.updated}
                                           createdName={s.name}
                            /></div>
                        })}
                    </Paper>
                </div>
                    <PaginationComponent/>
            </Paper>
        </div>
    )
}