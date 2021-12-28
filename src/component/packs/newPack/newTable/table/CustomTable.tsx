import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import {cardPacksType} from "../../../../../reducers/packReducer";
import {Paper} from "@material-ui/core";
import style from "./CustomTable.module.css";
import {Row} from "../tableRow/tableRow";
import * as React from "react";

type PropsType = {
    text: string
}

export const CustomTable = ({text}:PropsType) => {
    const cardPacks = useSelector<AppRootStateType, cardPacksType>(s => s.pack.cardPacks)
    return (
        <div>
            <Paper style={{boxShadow: "#bde0ea -2px 15px 15px 1px"}}>
                <div className={style.tableHeader}>
                    <div className={style.textHeader} style={{textAlign: "start"}}>Name</div>
                    <div className={style.textHeader} style={{width: "30%"}}>Cards</div>
                    <div className={style.textHeader}>Last Updated</div>
                    <div className={style.textHeader} style={{width: "100%"}}>Created by</div>
                    <div className={style.textHeader} style={{width: "80%"}}>Actions</div>
                </div>

                {cardPacks.map((s, index) => {
                    return <div  key={s._id} style={index % 2 === 0 ? {background: "white"} : {background: "#ECECF9"}}>
                        <Row
                            text={text}
                            cardUserId={s.user_id}
                            packId = {s._id}
                            name={s.name.substr(0, 35)}
                            cards={s.cardsCount}
                            update={s.updated.substr(0, 35)}
                            createdName={s.user_name.substr(0, 35)}
                        /></div>
                })}
            </Paper>
        </div>
    )
}