import React from "react";
import { makeStyles } from '@mui/styles'
import s from '../restorePassword/Restore.module.css'
import {SendInstructionToEmail} from "../../reducers/restoreReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../store/store";
import {useFormik} from "formik";
import {Button, Paper, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {useStyles} from "../newPassword/newPassword";

export const RestorePassword = () => {
    const navigation = useNavigate()
    const statusOfSentMessage = useSelector<AppRootStateType, boolean>(state => state.restorePass.statusOfSentMessage)
    const dispatch = useDispatch()
    const classes = useStyles()

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = `<div style="background-color: lime; padding: 15px">
	<a href='http://localhost:3000/#/set-new-password/$token$'>	
	link</a></div>`

    const sendInstruction = (email: string) => {
        dispatch(SendInstructionToEmail({email, from, message}))
    }

    if (statusOfSentMessage) {
        navigation('/info-sent-email')
    }

    const signupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required field'),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: signupSchema,
        onSubmit: values => {
            sendInstruction(values.email)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.stylePaper}>
                <h1>It-incubator</h1>
                <h3>Forgot your password? </h3>
                <TextField
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{width: "347px"}}
                    variant={'standard'}
                    id="email"
                    name="email"
                    placeholder={"Email"}
                    onChange={formik.handleChange}
                />
                <h4 className={s.text}>Enter your email address and we will send you further instructions </h4>
                <Button sx={{borderRadius: '30px', backgroundColor: "#21268F", width: "266px"}} variant={"contained"} type="submit">Send Instructions</Button>
            </Paper>

        </form>
    );

}