import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {Paper} from "@mui/material";
import {makeStyles} from "@mui/styles";
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const useStyles = makeStyles({
    stylePaper : {
        width: "413px",
        height: "468px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        left: "434px",
        top: "126px",
        padding: "33px",
        justifyContent: "space-evenly",
        alignItems: "center",
    }
});

export const InfoSentEmail = () => {
    const email = useSelector<AppRootStateType, string>(s => s.restorePass.email)
    const classes = useStyles()

    return (

        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.stylePaper}>
                <h1>It-incubator</h1>
                <div>
                    <SentimentVerySatisfiedIcon color={"success"} style={{width:"108px", height:"108px"}}/>
                </div>
                <h2  style={{color: "green"}}>Check Email </h2>
                <h4 style={{color: "#a9a9a9"}}>We’ve sent an Email with instructions to email {email}</h4>
            </Paper>
       </div>
    )
}