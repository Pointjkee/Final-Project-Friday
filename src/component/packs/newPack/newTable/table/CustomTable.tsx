import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import {cardPacksType} from "../../../../../reducers/packReducer";
import {LinearProgress, Paper} from "@material-ui/core";
import style from "./CustomTable.module.css";
import {Row} from "../tableRow/tableRow";
import * as React from "react";
import {SortButton} from "./SortButton";
import {RequestStatusType} from "../../../../../reducers/appReducer";

type PropsType = {
    text: string
}

export const CustomTable = ({text}:PropsType) => {
    const cardPacks = useSelector<AppRootStateType, cardPacksType>(s => s.pack.cardPacks)
    const status = useSelector<AppRootStateType, RequestStatusType>(s => s.app.statusPack)
    return (
        <div>
            <Paper style={{boxShadow: "#bde0ea -2px 15px 15px 1px"}}>
                <div className={style.tableHeader}>
                    <div className={style.textHeader}>
                        <div className={style.searchHeader} style={{justifyContent: "start"}}>Name <SortButton sortTitle1={"1name"} sortTitle0={"0name"}/></div>
                    </div>
                    <div className={style.textHeader} style={{width: "30%"}}>
                        <div className={style.searchHeader}>Cards <SortButton sortTitle0={"0cardsCount"} sortTitle1={"1cardsCount"}/></div>
                    </div>
                    <div className={style.textHeader}>
                        <div className={style.searchHeader} style={{width: "100%"}}>Last Updated <SortButton sortTitle1={"1updated"} sortTitle0={"0updated"}/></div>
                    </div>
                    <div className={style.textHeader}>
                          <div className={style.searchHeader}>Created by<SortButton sortTitle1={"1user_name"} sortTitle0={"0user_name"}/></div>
                    </div>
                    <div className={style.textHeader} style={{width: "80%"}}>
                      Actions
                    </div>

                </div>
                <div style={{height:"1px"}}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
                {cardPacks.map((s, index) => {
                    return <div  key={s._id} style={index % 2 === 0 ? {background: "white"} : {background: "#ECECF9"}}>
                            <Row
                            text={text}
                            cardUserId={s.user_id}
                            packId={s._id}
                            name={s.name.substr(0, 35)}
                            cards={s.cardsCount}
                            update={s.updated.substr(0, 35)}
                            createdName={s.user_name.substr(0, 35)}
                        />
                    </div>
                })}
            </Paper>
        </div>
    )
}