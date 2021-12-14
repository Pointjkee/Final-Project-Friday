import React from 'react'
import SuperButton from "../../common/superButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Navigate, NavLink} from "react-router-dom";
import {useFormik} from "formik";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@material-ui/core";


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
                            <NavLink to='/restore'>Forgot?</NavLink>
                        </div>
                        <div>
                            <SuperButton type='submit'>sign in</SuperButton>
                        </div>
                    </FormGroup>
                    <div>
                        <NavLink to='/register'>Register</NavLink>
                    </div>
                </FormControl>
            </form>
        </>

    )
}