import * as React from 'react';
import style from './CustomTable.module.css'
import {Button} from "@material-ui/core";

type RowPropsType = {
    name: string
    cards: number
    update: string
    createdName: string
}

let buttonWrapper = {alignItems:"start", width: "75%",marginRight:"30px",display:"flex",alignContent:"start",justifyContent:"space-between"}

export const Row = ({name, cards, update, createdName}: RowPropsType) => {
    return (
        <div>
            <div className={style.row}>
                <div style={{textAlign: "start", marginLeft: "30px", width: "80%"}}>{name}</div>
                <div style={{width: "30%"}}>{cards}</div>
                <div style={{width: "70%"}}>{update}</div>
                <div style={{width: "70%"}}>{createdName}</div>

                <div style={buttonWrapper}>
                    <Button style={{width: "40%"}} size={"small"} variant={"contained"} color={"error"}>Delete</Button>
                       <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"success"}>Edit</Button>
                       <Button  size={"small"} variant={"contained"} color={"inherit"}>Learn</Button>
                </div>

            </div>
        </div>
    )
}