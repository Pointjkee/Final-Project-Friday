import * as React from 'react';
import style from './Tabble.module.css'
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {deletePack} from "../../../../../reducers/packReducer";
import ModalDelete from "../../../modal/ModalDelete";
import ModalEdit from "../../../modal/ModalEdit";
import {useNavigate} from "react-router-dom";

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

export const Row = ({name, cards, update, createdName,packId,text}: RowPropsType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clickDeletePack = () => {
                dispatch(deletePack({packName:text, id:packId}))
    }

    const onCardsNavigateClick = () =>{
        return navigate('/cards/' + packId)
    }


    return (
        <div>
            <div className={style.rowTable}>
                <div className={style.rowText} style={{textAlign: "start"}}> {name} </div>
                <div className={style.rowText} style={{width: "30%"}}>{cards}</div>
                <div className={style.rowText}>{update}</div>
                <div className={style.rowText} style={{width: "100%"}}>{createdName}</div>

                <div style={buttonWrapper}>
                    <Button style={{width: "35%"}} size={"small"} variant={"contained"} color={"error"}>
                        <ModalDelete text={text} packId={packId}/>
                    </Button>
                    <Button style={{width: "10%"}} size={"small"} variant={"contained"} color={"success"}>
                        <ModalEdit title={name} packId={packId}/>
                    </Button>
                        <Button onClick={onCardsNavigateClick} size={"medium"} variant={"contained"} color={"inherit"}
                                style={{color: 'black'}}>Learn</Button>

                </div>

            </div>
        </div>
    )
}