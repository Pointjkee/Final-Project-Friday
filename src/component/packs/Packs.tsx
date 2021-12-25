import * as React from 'react';
import DataTable from './Table';
import styles from './Packs.module.css'
import {CustomTable} from "./newPack/newTable";

export const Packs = () => {
    return <div>
        {/*<div><DataTable/></div>*/}
        <div><CustomTable/></div>
    </div>
}
