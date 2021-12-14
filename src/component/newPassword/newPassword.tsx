import React, {useState} from "react";
import SuperInputText from "../../common/superInputText/SuperInputText";
import SuperButton from "../../common/superButton/SuperButton";
import s from '../restorePassword/Restore.module.css'
import {useParams} from "react-router-dom";
import {changePassword} from "../../reducers/newPasswordReducer";
import {useDispatch} from "react-redux";

export const NewPassword = () => {
    let [password, setPassword] = useState("")

    const {token} = useParams()
    const dispatch = useDispatch()

    const resetPasswordToken = token

    const updatePassword = (value: string) => {
        setPassword(value)
    }

    const newPassword = () => {
        if (token) {
            dispatch(changePassword({password, resetPasswordToken}))
        }
    }



    return (
        <div>
            <h1>It-incubator</h1>
            <h3>Create new password </h3>
            <SuperInputText value={password} onChangeText={updatePassword}/>
            <h4 className={s.text}>Create new password and we will send you further instruction to email</h4>
            <SuperButton onClick={newPassword}>Create new password</SuperButton>
        </div>
    )
}