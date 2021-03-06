import {Button, Input} from '@mui/material';
import React, {useState} from 'react';
import s from './Profile.module.css'
import {useForm} from "react-hook-form";
import {AppRootStateType} from "../../store/store";
import {editProfile, InitialStateTypeProfile} from "../../reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import nonAvatarPic from "../../assets/images/nonAvatarPic.png"
import {Link, Navigate, useNavigate} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {logOut} from "../../reducers/authReducer";
import {RequestStatusType} from "../../reducers/appReducer";
import {Preloader} from "../../common/preloader/Preloader";
import {Paper} from "@material-ui/core";

const Profile = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const profile = useSelector<AppRootStateType, InitialStateTypeProfile>(state => state.profile);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    const {
        email,
        name,
        avatar
    } = profile.profile

    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    const {register, handleSubmit} = useForm({
        defaultValues: {
            name: name,
            avatar: avatar
        }
    })
    const onSubmit = handleSubmit(data => {
        console.log(data)
        dispatch(editProfile(data))
    });

    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        setEditMode(false)
    }


    const onLogOutClick = () => {
        dispatch(logOut())
    }

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <div className={s.wrapper}>
            <Paper className={s.container}>
                <div className={s.photo}>
                    <h2>Personal Information</h2>
                    <img
                        src={avatar ? avatar : nonAvatarPic}
                        alt="photo"/>
                </div>
                {status === 'loading' && <Preloader/>}
                <div style={{marginTop:"10px"}}>
                    <Button onClick={onLogOutClick} variant={"outlined"}>Log out</Button>
                </div>
                {!editMode && <div className={s.info}>
                    <span>NickName</span>
                    <div className={s.profileData} onDoubleClick={activateEditMode}>{name}</div>
                    <span>Email</span>
                    <div className={s.profileData} onDoubleClick={activateEditMode}>{email}</div>

                    <Link to="/packs" style={{textDecoration: 'none'}}>
                        <Button size='small' sx={{height:"40px", width:"100%", marginTop:"20px"}} variant={"contained"}>
                            Go to pack
                            <ArrowForwardIcon sx={{marginLeft:"10px", padding:"2px"}}/>
                        </Button>
                    </Link>

                </div>}

                {editMode && <form className={s.form} onSubmit={onSubmit}>
                    <div className={s.info_form}>
                        <span>NickName</span>
                        <Input {...register('name')}/>
                        <span>Image Url</span>
                        <Input {...register('avatar')}/>
                    </div>
                    <div className={s.button}>
                        <Button onClick={deactivateEditMode} variant="contained" color="secondary">Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                    </div>

                </form>
                }


            </Paper>
        </div>
    );
};

export default Profile;


