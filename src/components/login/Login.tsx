import React from 'react'
import SuperButton from "../../common/superButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Link, TextField} from "@material-ui/core";


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
            },
            initialValues: {
                email: '',
                password: '',
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
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>Login</FormLabel>
                    <FormGroup>
                        <TextField label='Email' type='email' {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField label='Password' type='password' {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label='Remember me'
                                          control={<Checkbox
                                              {...formik.getFieldProps('rememberMe')}
                                              checked={formik.values.rememberMe}/>}/>
                        <div>
                            <Link href='#/restore'>Forgot?</Link>
                        </div>
                        <div>
                            <SuperButton type='submit'>sign in</SuperButton>
                        </div>
                    </FormGroup>
                    <div>
                        <Link href='#/register'>Register</Link>
                    </div>
                </FormControl>
            </form>
        </>

    )
}