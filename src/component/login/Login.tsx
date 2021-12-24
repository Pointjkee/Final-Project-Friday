import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {Checkbox, FormControl, FormControlLabel, FormGroup, TextField} from "@material-ui/core";
import s from './Login.module.css'
import Button from "@mui/material/Button";


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
        <>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <FormControl>
                    <h1>IT-Incubator</h1>
                    <h2>Sign In</h2>
                    <FormGroup>
                        <TextField
                            label='Email'
                            type='email'
                            margin='normal'
                            variant='standard'
                            {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
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
                        <div className={s.buttonBlock}>
                            <Button type={'submit'} variant="contained" disabled={!formik.isValid}>Login</Button>
                            <Button variant="contained" href={'#/restore'}>Forgot?</Button>
                            <Button variant="contained" href={'#/register'}>Register</Button>
                        </div>
                    </FormGroup>
                </FormControl>
            </form>
        </>

    )
}