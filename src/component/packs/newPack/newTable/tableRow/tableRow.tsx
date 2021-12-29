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

export const Row = ({name, cards, update, createdName, cardUserId,packId,text}: RowPropsType) => {
    const meProfileId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)
    const navigate = useNavigate()


        const onCardsNavigateClick = () => {
            return navigate('/cards/' + packId)
        }

        const onGameNavigateClick = () => {
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
                            <ModalDelete packId={packId} text={text}/>
                            <ModalEdit title={name} packId={packId}/>
                        </>}
                        {cards > 0 &&<>
                            <Button style={{width: "30%"}} size={"small"} variant={"contained"}
                                    color={"secondary"}
                            onClick={onCardsNavigateClick}>Look</Button>
                         <Button
                            style={{width: "30%"}} size={"small"} variant={"contained"}
                            color={"secondary"}
                            onClick={onGameNavigateClick}>Learn</Button>
                        </>}

                    </div>

                </div>
            </div>
        )
    }