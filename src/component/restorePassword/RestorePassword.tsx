import React, {useState} from "react";
import SuperInputText from "../../common/superInputText/SuperInputText";
import SuperButton from "../../common/superButton/SuperButton";
import s from '../restorePassword/Restore.module.css'
import {SendInstructionEmail} from "../../reducers/restoreReducer";
import {useDispatch} from "react-redux";

export const RestorePassword = () => {
    let [email,setEmail] = useState("")
    let dispatch = useDispatch()

    const changeInput = (value:string) => {
        setEmail(value)
    }

    const sendInstruction = () => {
        dispatch(SendInstructionEmail())
    }

    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Forgot your password? </h3>
            <SuperInputText value={email} onChangeText={changeInput} />
            <h4 className={s.text}>Enter your email address and we will send you further instructions </h4>
            <SuperButton onClick={sendInstruction}>Send Instructions</SuperButton>
        </div>
    )
}