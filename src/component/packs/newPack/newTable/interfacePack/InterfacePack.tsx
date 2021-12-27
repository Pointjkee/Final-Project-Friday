import * as React from 'react';
import style from './InterfacePack.module.css'
import {Button, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPack, getPack} from "../../../../../reducers/packReducer";
import {AppRootStateType} from "../../../../../store/store";
import {CustomTable} from "../table/CustomTable";
import {PaginationComponent} from "../Pagination/PaginationComponent";
import ModalAdd from '../../../modal/ModalAdd';


export const InterfacePack = () => {
    const [value, setValue] = useState("")
    const pageSize = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)
    const dispatch = useDispatch()


    const changeTextFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const searchPack = () => {
        dispatch(getPack({packName: value, pageCount: pageSize, page}))
    }

    const keySearch = (e: React.KeyboardEvent) => {
        if (e.code == 'Enter') {
            searchPack();
        }
    }


    return (
        <div>
            <div className={style.interfaceWrapper}>

                <div className={style.tools}>
                    <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}>
                        <InputBase sx={{ml: 1, flex: 1}} placeholder="Search" value={value}
                                   onChange={changeTextFieldValue} onKeyPress={keySearch}/>
                        <IconButton sx={{p: '5px'}} onClick={searchPack}>
                            <SearchIcon/>
                        </IconButton>
                    </Paper>

                    <Button variant={"contained"}>
                        <ModalAdd/>
                    </Button>
                </div>

            </div>
            <CustomTable text={value}/>
            <PaginationComponent text={value}/>
        </div>
    )
}