import React from "react";
import {SendInstructionToEmail} from "../../reducers/restoreReducer";
import s from '../../style/styleForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {AppRootStateType} from "../../store/store";
import {useFormik} from "formik";
import {Button, Paper, TextField} from "@material-ui/core";
import * as Yup from 'yup';

export const RestorePassword = () => {
    const navigation = useNavigate()
    const statusOfSentMessage = useSelector<AppRootStateType, boolean>(state => state.restorePass.statusOfSentMessage)
    const dispatch = useDispatch()

    const from = "test-front-admin <ai73a@yandex.by>"
    const message = `<div style="background-color: lime; padding: 15px">
	<a href='https://pointjkee.github.io/Final-Project-Friday/#/set-new-password/$token$'>Change Password</a></div>`

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
        <form onSubmit={formik.handleSubmit} className={s.form}>
            <Paper className={s.stylePaper}>
                <h1>IT-Incubator</h1>
                <h3>Forgot your password? </h3>
                <TextField
                    className={s.textField}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    variant={'standard'}
                    id="email"
                    name="email"
                    label={"Email"}
                    placeholder={"Email"}
                    onChange={formik.handleChange}
                />
                <h4 className={s.text}>Enter your email address and we will send you further instructions </h4>
                <Button className={s.buttonStyle} variant={"contained"} type="submit">Send Instructions</Button>
                <Button variant={"text"} href={'#/login'}>Try logging in</Button>
            </Paper>

        </form>
    );

}