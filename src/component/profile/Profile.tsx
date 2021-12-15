import {Button, Input} from '@mui/material';
import React, {useState} from 'react';
import s from './Profile.module.css'
import {useForm} from "react-hook-form";

const Profile = () => {

    const [editMode, setEditMode] = useState(false)
    const {register, handleSubmit} = useForm()
    const onSubmit = handleSubmit(data => console.log(data));

    const activateEditMode = () => setEditMode(true)
    const deactivateEditMode = () => {
        setEditMode(false)
    }


    return (
        <div className={s.container}>
            <div className={s.photo}>
                <span>Personal Information</span>
                <img
                    src="https://cdn4.iconfinder.com/data/icons/avatar-basic-outline-doodle/91/Avatar__Basic_Doodle_02-512.png"
                    alt="photo"/>
            </div>
            {!editMode && <div className={s.info}>
                <span>NickName</span>
                <div onDoubleClick={activateEditMode}> Name </div>
                <span>Email</span>
                <div onDoubleClick={activateEditMode}>aaaaaaa@mail.com</div>
            </div>}
            {editMode && <form className={s.form} onSubmit={onSubmit}>
                <div className={s.info_form}>
                    <span>NickName</span>
                    <Input {...register('name')}/>
                    <span>Image Url</span>
                    <Input {...register('image')}/>
                </div>
                <div className={s.button}>
                    <Button onClick={deactivateEditMode} variant="contained" color="secondary">Cancel</Button>
                    <Button  variant="contained" color="primary" type="submit">Save</Button>
                </div>
            </form>
            }


        </div>
    );
};

export default Profile;


