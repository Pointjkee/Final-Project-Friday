import * as React from 'react';
import style from './Tabble.module.css'
import {Button} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import {useDispatch} from "react-redux";
import {deletePack} from "../../../../../reducers/packReducer";
import ModalDelete from "../../../modal/ModalDelete";
import ModalEdit from "../../../modal/ModalEdit";
import {NavLink} from "react-router-dom";
import ModalEdit from "../../../modal/ModalEdit";
import {useNavigate} from "react-router-dom";
import CardGame from "../../../../cardGame/CardGame";

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
export const Row = ({name, cards, update, createdName,packId,text}: RowPropsType) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const clickDeletePack = () => {
                dispatch(deletePack({packName:text, id:packId}))
    }

    const onCardsNavigateClick = () =>{
        return navigate('/cards/' + packId)
    }

    const onGameNavigateClick =()=>{
         navigate('/game/' + packId)
    }

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
                    <Button style={{width: "35%"}} size={"small"} variant={"contained"} color={"error"}>
                        <ModalDelete text={text} packId={packId}/>
                    </Button>
                    <Button style={{width: "10%"}} size={"small"} variant={"contained"} color={"success"}>
                        <ModalEdit title={name} packId={packId}/>
                    </Button>
                        <Button onClick={onCardsNavigateClick} size={"medium"} variant={"contained"} color={"inherit"}
                                style={{color: 'black'}}>Learn</Button>
                    <Button onClick={onGameNavigateClick}>Play</Button>

                </div>

            </div>
        </div>
    )
}