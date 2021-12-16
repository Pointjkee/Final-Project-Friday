import {Button, Input} from '@mui/material';
import React, {useState} from 'react';
import s from './Profile.module.css'
import {useForm} from "react-hook-form";
import {AppRootStateType} from "../../store/store";
import {editProfile, InitialStateTypeProfile} from "../../reducers/profileReducer";
import {useDispatch, useSelector} from "react-redux";
import nonAvatarPic from "../../assets/images/nonAvatarPic.png"
import {Navigate} from "react-router-dom";
import {logOut} from "../../reducers/authReducer";
import {RequestStatusType} from "../../reducers/appReducer";
import {Preloader} from "../../common/preloader/Preloader";

const Profile = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state=> state.app.status)
    const profile = useSelector<AppRootStateType, InitialStateTypeProfile>(state => state.profile);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const {
        email,
        name,
        avatar
    } = profile.profile

    const dispatch = useDispatch()

    const [editMode, setEditMode] = useState(false)

    const {register, handleSubmit} = useForm({defaultValues:{
            name:name,
            avatar:avatar
        }})
    const onSubmit = handleSubmit(data => {
        console.log(data)
        dispatch(editProfile(data))});

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
        <div className={s.container}>
            <div className={s.photo}>
                <span>Personal Information</span>
                <img
                    src={avatar ? avatar : nonAvatarPic}
                    alt="photo"/>
            </div>
            {status === 'loading' && <Preloader/>}
            <div>
                <Button onClick={onLogOutClick} variant="contained">Log out</Button>
            </div>
            {!editMode && <div className={s.info}>
                <span>NickName</span>
                <div onDoubleClick={activateEditMode}>{name}</div>
                <span>Email</span>
                <div onDoubleClick={activateEditMode}>{email}</div>
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


        </div>
    );
};

export default Profile;


