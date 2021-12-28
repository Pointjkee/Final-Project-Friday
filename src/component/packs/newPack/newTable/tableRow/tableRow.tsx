import * as React from 'react';
import style from './Tabble.module.css'
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import ModalDelete from "../../../modal/ModalDelete";
import ModalEdit from "../../../modal/ModalEdit";
import {NavLink} from "react-router-dom";

type RowPropsType = {
    name: string
    cards: number
    update: string
    createdName: string
    packId: string
    cardUserId: string
    text: string
}


let buttonWrapper = {
    alignItems: "center",
    width: "80%",
    height: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
}

export const Row = ({name, cards, update, createdName, cardUserId, ...props}: RowPropsType) => {
    const meProfileId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)

    return (
        <div>
            <div className={style.rowTable}>
                <div className={style.rowText} style={{textAlign: "start"}}> {name} </div>
                <div className={style.rowText} style={{width: "30%"}}>{cards}</div>
                <div className={style.rowText}>{update}</div>
                <div className={style.rowText} style={{width: "100%"}}>{createdName}</div>

                <div style={buttonWrapper}>

                    {cardUserId === meProfileId &&
                    <>
                        <ModalDelete packId={props.packId} text={props.text}/>
                        <ModalEdit title={name} packId={props.packId}/>
                    </>}
                    <NavLink to={'/cards/' + props.packId} style={{textDecoration: 'none'}}>
                        <Button style={{width: "30%"}} size={"small"} variant={"contained"}
                                color={"secondary"}>Learn</Button>
                    </NavLink>
                </div>

            </div>
        </div>
    )
}