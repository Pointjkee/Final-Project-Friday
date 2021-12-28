import * as React from 'react';
import style from './InterfacePack.module.css'
import {Button, IconButton, InputBase, Paper, Switch} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPack, getPack} from "../../../../../reducers/packReducer";
import {AppRootStateType} from "../../../../../store/store";
import {CustomTable} from "../table/CustomTable";
import {PaginationComponent} from "../Pagination/PaginationComponent";
import {Refresh} from "@material-ui/icons";
import SliderCustom from "./Slider";
import {changeMePackStatus} from "../../../../../reducers/appReducer";

export const InterfacePack = () => {
    const [value, setValue] = useState("")
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)
    const min = useSelector<AppRootStateType, number>(s => s.pack.minCardsCount)
    const max = useSelector<AppRootStateType, number>(s => s.pack.maxCardsCount)
    const pageCount = useSelector<AppRootStateType, number>(s=>s.pack.pageCount)
    const dispatch = useDispatch()

    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)
    const meUserId = useSelector<AppRootStateType, string|null>(s=>s.profile.profile._id)


    let user_id ="";
    if(meUserId !== null && isMePack){
        user_id = meUserId
    }


    const changeTextFieldValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const searchPack = () => {
        dispatch(getPack({packName: value,user_id, pageCount, page}))
    }

    const resetText = () => {
        setValue("")
        dispatch(getPack({pageCount,user_id, page}))
    }

    const keySearch = (e: React.KeyboardEvent) => {
        if (e.code == 'Enter') {
            searchPack();
        }
    }

    const clickAddPack = () => {
        dispatch(addPack({packName: value}))
    }


    const changeSwitchPack = () => {
        dispatch(changeMePackStatus(!isMePack))
    }


    return (
        <div>
            <div className={style.interfaceWrapper}>

                <div className={style.tools}>
                    <Paper sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}>
                        <InputBase sx={{ml: 1, flex: 1}} placeholder="Search" value={value} onChange={changeTextFieldValue} onKeyPress={keySearch}/>
                        <IconButton sx={{p: '5px'}} onClick={searchPack} color={"primary"}>
                            <SearchIcon/>
                        </IconButton>
                        <IconButton sx={{p: '5px'}} onClick={resetText} color={"success"} disabled={value === ""}>
                            <Refresh/>
                        </IconButton>
                    </Paper>

                    <div style={{display:"flex", alignItems:"center",fontWeight:"bold"}}>
                         <span style={isMePack?{ color:"#cccccc"}: {color:"#84308f"}}>ALL PACKS</span>
                        <Switch checked={isMePack} color={"secondary"} onChange={changeSwitchPack}/>
                        <span style={isMePack?{ color:"#84308f"}: {color:"#cccccc"}}>ME PACKS</span>

                    </div>

                    <SliderCustom/>

                    <Button variant={"contained"} onClick={clickAddPack}>Add Task</Button>


                </div>

            </div>
            <CustomTable text={value}/>
            <PaginationComponent text={value}/>
        </div>
    )
}