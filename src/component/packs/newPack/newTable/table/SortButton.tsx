import * as React from "react";
import {ButtonGroup, IconButton} from "@material-ui/core";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import {getPack} from "../../../../../reducers/packReducer";
import {changeDisabledStatus, typeSortChange} from "../../../../../reducers/appReducer";

type PropsType = {
    sortTitle1: string
    sortTitle0: string
}

export const SortButton = ({sortTitle1,sortTitle0}: PropsType) => {
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)
    const pageCount = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)
    const meUserId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)
    const min = useSelector<AppRootStateType, number>(s => s.pack.minCardsCount)
    const max = useSelector<AppRootStateType, number>(s => s.pack.maxCardsCount)
    const disabled = useSelector<AppRootStateType, boolean>(s=>s.app.disabledSort)
    const dispatch = useDispatch()

    const [toggleSort0, setToggleSort0] = useState(false)
    const [toggleSort1, setToggleSort1] = useState(false)

    let user_id = meUserId !== null && isMePack ? meUserId : "";

    const sortChange0 = () => {
        setToggleSort0(true)
        setToggleSort1(false)
        dispatch(changeDisabledStatus(true))
        dispatch(typeSortChange(sortTitle0))
        dispatch(getPack({pageCount, sortPacks: sortTitle0, user_id, min, max}))
    }
    const sortChange1 = () => {
        setToggleSort0(false)
        setToggleSort1(true)
        dispatch(typeSortChange(sortTitle1))
        dispatch(changeDisabledStatus(true))
        dispatch(typeSortChange(sortTitle1))
        dispatch(getPack({pageCount, sortPacks: sortTitle1, user_id, min, max}))
    }

    const cancelSort = () => {
        setToggleSort0(false)
        setToggleSort1(false)
        dispatch(getPack({pageCount, user_id, min, max}))
        dispatch(typeSortChange(""))
        dispatch(changeDisabledStatus(false))
    }


    return (
        <div>
            <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined button group"
                    sx={{ml: "10px"}}
                    disabled={disabled}
                >
                    <Button onClick={sortChange0} sx={{width: "18px", height: "18px", padding: "0"}} style={toggleSort0 ? {background:"#9026a6", color:"white"}:{background:""}}  variant={ "outlined"}
                            color={"secondary"}>
                        <ArrowUpwardIcon style={{padding: "2px"}}/>
                    </Button>


                    <Button onClick={sortChange1} sx={{width: "18px", height: "18px", padding: "0"}} style={   toggleSort1 ? {background:"#283fcc", color:"white"}:{background:""}}  variant={"outlined"}
                            color={"primary"}>
                        <ArrowDownwardIcon fontSize={"small"} sx={{p: "5"}}/>
                    </Button>
                </ButtonGroup>

                {(toggleSort0 || toggleSort1) &&
                <div><IconButton style={{padding: "0"}} onClick={cancelSort} size={"small"} color={"warning"}>< CloseIcon/></IconButton></div>}
            </div>

        </div>
    )
}

