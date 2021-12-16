import * as React from 'react';
import {CircularProgress} from "@mui/material";
import s from './Preloader.module.css'

export const Preloader=()=> {
    return (
       <div className={s.loader}>
           <CircularProgress />
       </div>
    );
}