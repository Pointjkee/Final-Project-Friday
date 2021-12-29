import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../store/store";
import {getPack, setMaxCardsCount, setMinCardsCount} from "../../../../../reducers/packReducer";
import {Search} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";


export default function SliderCustom() {
    const min = useSelector<AppRootStateType, number>(s => s.pack.minCardsCount)
    const max = useSelector<AppRootStateType, number>(s => s.pack.maxCardsCount)
    const pageSize = useSelector<AppRootStateType, number>(s => s.pack.pageCount)
    const sortPacks = useSelector<AppRootStateType, string>(s => s.app.sortPacks)
    const [value, setValue] = React.useState<number[]>([min, max]);
    const dispatch = useDispatch()

    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)
    const meUserId = useSelector<AppRootStateType, string | null>(s => s.profile.profile._id)


    let user_id = meUserId !== null && isMePack ? meUserId : "";

    const minDistance = 0;

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 103 - minDistance);
                setValue([clamped, clamped + minDistance]);

            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);

            }
        } else {
            setValue(newValue as number[]);
        }
    };

    const clickSortCard = () => {
        if (min !== value[0] || max !== value[1]) {
            dispatch(setMinCardsCount({minCardsCount: value[0]}))
            dispatch(setMaxCardsCount({maxCardsCount: value[1]}))
            dispatch(getPack({sortPacks,pageCount: pageSize, user_id, min: value[0] as number, max: value[1] as number}))
        }
    }

    return (
        <Box sx={{width: "35%", display: "inline-flex", gap: "15px", margin: "0  0 0 30px "}}>

            <Slider
                min={0}
                max={103}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
            />
            <IconButton sx={{p: '5px'}} size={"small"} onClick={clickSortCard} color={"primary"}>
                <Search/>
            </IconButton>
        </Box>
    );
}