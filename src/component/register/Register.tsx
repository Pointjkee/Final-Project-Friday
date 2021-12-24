import React, {ChangeEvent, useState} from "react";
import styles from './Register.module.css'
import {registerThunk} from "../../reducers/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Link, Navigate} from "react-router-dom";
import {Container, IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";

export const Register = React.memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password1, setPassword1] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [pass1, setPass1] = useState<boolean>(false)
    const [pass2, setPass2] = useState<boolean>(false)
    const dispatch = useDispatch()
    const errorRegister = useSelector<AppRootStateType, string | null>(state => state.register.error)
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const onChangeEmail = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onChangePassword1 = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword1(e.currentTarget.value)
    }
    const onChangePassword2 = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword2(e.currentTarget.value)
    }
    const onChange = () => {
        if (password1 === password2) {
            dispatch(registerThunk(email, password1))
        }
    }
    let errorPassword = false
    if (password1 !== password2) {
        errorPassword = true
    }
    if (isRegister) {
        return <Navigate to='/login'/>
    }
    const togglePassword1 = () => {
        setPass1(!pass1)
    }
    const togglePassword2 = () => {
        setPass2(!pass2)
    }
    return (
        <div className={styles.main}>
            <Container
                className={styles.container}
                sx={{width: 400, paddingBottom: 5, marginTop: 3}}
            >
                <h1>It-incubator</h1>
                <h3>Sign Up</h3>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Email"
                        value={email}
                        onChange={onChangeEmail}
                        sx={{width: 300}}
                        size='small'
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <TextField
                        type={pass1 ? 'text' : 'password'}
                        label='Password'
                        size='small'
                        sx={{width: 300}}
                        value={password1}
                        onChange={onChangePassword1}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePassword1}
                                        edge="end"
                                    >
                                        {pass1 ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div>
                    <div style={{marginTop: 20}}>
                        <TextField
                            type={pass2 ? 'text' : 'password'}
                            label='Confirm Password'
                            size='small'
                            sx={{width: 300}}
                            value={password2}
                            onChange={onChangePassword2}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePassword2}
                                            edge="end"
                                        >
                                            {pass2 ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </div>
                {errorPassword
                &&
                <div style={{color: 'red'}}> Incorrect passwords!</div>
                ||
                !!errorRegister
                &&
                <div style={{color: 'red'}}>{errorRegister}</div>
                }
                <div style={{marginTop: 30}}>
                    <Button
                        size='medium'
                        onClick={onChange}
                        variant="contained"
                        style={{marginRight: 50}}
                        disabled={!email || !password1 || !password2}
                    >Register</Button>
                    <Link to="/login" style={{textDecoration: 'none'}}>
                        <Button size='medium' variant="outlined">Cancel</Button>
                    </Link>
                </div>
            </Container>
        </div>
    )
})