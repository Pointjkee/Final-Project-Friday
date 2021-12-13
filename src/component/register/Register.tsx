import SuperInputText from "../../common/superInputText/SuperInputText";
import React, {useState} from "react";
import SuperButton from "../../common/superButton/SuperButton";
import styles from './Register.module.css'
import {registerThunk} from "../../reducers/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Link, Navigate} from "react-router-dom";

export const Register = React.memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password1, setPassword1] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const dispatch = useDispatch()
    const errorRegister = useSelector<AppRootStateType, string | null>(state => state.register.error)
    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const onChangeEmail = (value: string) => {
        setEmail(value)
    }
    const onChangePassword1 = (value: string) => {
        setPassword1(value)
    }
    const onChangePassword2 = (value: string) => {
        setPassword2(value)
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
    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Sign Up</h3>
            <div>
                <div className={styles.inputDiv}>Email:</div>
                <div><SuperInputText onChangeText={onChangeEmail}/></div>
            </div>
            <div>
                <div className={styles.inputDiv}>Password:</div>
                <div><SuperInputText onChangeText={onChangePassword1} styleInput={'password'}/></div>
            </div>
            <div>
                <div className={styles.inputDiv}>Confirm password:</div>
                <div><SuperInputText onChangeText={onChangePassword2} styleInput={'password'}/></div>
            </div>
            {errorPassword
            &&
            <div style={{color: 'red'}}> Incorrect passwords!</div>
            ||
            !!errorRegister
            &&
            <div style={{color: 'red'}}>{errorRegister}</div>
            }
            <div>
                <SuperButton onClick={onChange}>Register</SuperButton>
                <Link to="/login"><SuperButton>Cancel</SuperButton></Link>
            </div>
        </div>
    )
})