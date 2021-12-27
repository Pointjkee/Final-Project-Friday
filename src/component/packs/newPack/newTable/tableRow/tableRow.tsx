import * as React from 'react';
import style from './Tabble.module.css'
import {Button} from "@material-ui/core";
import ModalDelete from "../../../modal/ModalDelete";
import ModalEdit from '../../../modal/ModalEdit';
import {NavLink} from "react-router-dom";

type RowPropsType = {
    name: string
    cards: number
    update: string
    createdName: string
    packId: string
    text: string
}


let buttonWrapper = {
    alignItems: "center",
    width: "80%",
    height: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "start"
}

export const Row = ({name, cards, update, createdName,...props}: RowPropsType) => {
    const dispatch = useDispatch()

    const clickDeletePack = () => {
                dispatch(deletePack({packName:props.text, id:props.packId}))
    }


    return (
        <div>
            <div className={style.rowTable}>
                <div className={style.rowText} style={{textAlign:"start"}}> {name} </div>
                <div className={style.rowText} style={{width:"30%"}}>{cards}</div>
                <div className={style.rowText}>{update}</div>
                <div className={style.rowText} style={{width: "100%"}}>{createdName}</div>

                <div style={buttonWrapper}>
                    <Button style={{width: "35%"}} size={"small"} variant={"contained"} color={"error"} onClick={clickDeletePack}>
                        Delete
                    </Button>
                       <Button style={{width: "10%"}} size={"small"} variant={"contained"} color={"success"}>Edit</Button>
                       <Button  size={"small"} variant={"contained"} color={"inherit"}>Learn</Button>
                </div>

            </div>
        </div>
    )
}