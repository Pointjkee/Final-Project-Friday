import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {Checkbox, FormControlLabel, Link, Paper, TextField} from "@material-ui/core";
import Button from "@mui/material/Button";
import s from '../../style/styleForm.module.css'

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
            validate: (values) => {
                if (!values.email) {
                    return {email: 'Email is required'}
                }
                if (!values.password) {
                    return {password: 'Password is required'}
                }
                if (values.password.length < 7) {
                    return {password: 'Password is at least seven characters'}
                }
            },
            initialValues: {
                email: 'nya-admin@nya.nya',
                password: '1qazxcvBG',
                rememberMe: false
            },
            onSubmit: values => {
                dispatch(loginThunk(values))
            },
        }
    );
    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <form className={s.form} onSubmit={formik.handleSubmit}>
            <Paper className={s.stylePaper}>
                <h1>IT-Incubator</h1>
                <h3>Sign In</h3>
                <TextField
                    className={s.textField}
                    label='Email'
                    type='email'
                    margin='normal'
                    variant='standard'
                    {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <TextField
                    className={s.textField}
                    label='Password'
                    type='password'
                    margin='normal'
                    variant='standard'
                    {...formik.getFieldProps('password')}/>
                {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <FormControlLabel label='Remember me'
                                  control={<Checkbox
                                      {...formik.getFieldProps('rememberMe')}
                                      checked={formik.values.rememberMe}/>}/>

                <div className={s.buttonWrapp}>
                    <Button variant={"text"} href={'#/restore'}>Forgot?</Button>
                    <Button variant={"text"} href={'#/register'}>Register</Button>
                </div>
                <Button className={s.buttonStyle} type={'submit'} variant="contained" disabled={!formik.isValid}>Login</Button>
            </Paper>
        </form>
    )
}