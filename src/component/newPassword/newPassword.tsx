import React, {useState} from "react";
import s from '../restorePassword/Restore.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {changePassword} from "../../reducers/newPasswordReducer";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, Paper, TextField} from "@material-ui/core";
import {makeStyles} from "@mui/styles";
import {AppRootStateType} from "../../store/store";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export const useStyles = makeStyles({
    stylePaper: {
        width: "413px",
        height: "540px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        left: "434px",
        top: "84px",
        padding: "33px",
        justifyContent: "space-evenly",
        alignItems: "center",
    }
});

export const NewPassword = () => {
    const classes = useStyles()
    const {token} = useParams()
    const dispatch = useDispatch()
    const statusNewPassword = useSelector<AppRootStateType, boolean>(state => state.newPass.statusNewPassword)
    const navigation = useNavigate()
    const [pass, setPass] = useState<boolean>(false)

    const togglePassword = () => {
        setPass(!pass)
    }

    const resetPasswordToken = token
    const newPassword = (password: string) => {
        if (token) {
            dispatch(changePassword({password, resetPasswordToken}))
        }
    }

    const signupSchema = Yup.object({
        password: Yup.string()
            .required('Please Enter your password')
            .min(7)
            .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,}/, "Password must contain at least 7 characters, one uppercase, one number and one lowwer case character")
    });

    if (statusNewPassword) {
        navigation('/login')
    }

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: signupSchema,
        onSubmit: values => {
            newPassword(values.password)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
            <Paper className={classes.stylePaper}>
                <h1>It-incubator</h1>
                <h3>Create new password </h3>
                <TextField
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{width: "347px"}}
                    variant={'standard'}
                    id="password"
                    name="password"
                    type={pass ? 'text' : 'password'}
                    placeholder={"Password"}
                    onChange={formik.handleChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassword}
                                    edge="end"
                                >
                                    {pass ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <h4 className={s.text}>Create new password and we will send you further instruction to email</h4>
                <Button sx={{borderRadius: '30px', backgroundColor: "#21268F", width: "266px"}} variant={"contained"} type="submit">Create new password</Button>
            </Paper>
        </form>
    );
}