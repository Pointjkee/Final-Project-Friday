import * as React from 'react';
import style from './Tabble.module.css'
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {cardPacksType, deletePack} from "../../../../../reducers/packReducer";
import {AppRootStateType} from "../../../../../store/store";

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
    justifyContent:"center",
    gap:"15px",
}

export const Row = ({name, cards, update, createdName, cardUserId,...props}: RowPropsType) => {
    const dispatch = useDispatch()
    const meProfileId = useSelector<AppRootStateType, string|null>(s => s.profile.profile._id)


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

                    {cardUserId === meProfileId &&
                    <>
                        <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"error"} onClick={clickDeletePack}>
                        Delete
                    </Button>
                        <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"success"}>
                            Edit
                        </Button>
                    </>}


                       <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"secondary"}>Learn</Button>
                </div>

            </div>
        </div>
    )
}