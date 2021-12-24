import * as React from 'react';
import DataTable from './Table';
import styles from './Packs.module.css'
import {useDispatch} from "react-redux";
import {deletePack} from "../../reducers/packReducer";

export const Packs = () => {
    const dispatch = useDispatch()
    let a = () => {
        dispatch(deletePack("sdsdsd"))
    }
    return <div className={styles.main}>
        <div><DataTable/></div>
    </div>
}
