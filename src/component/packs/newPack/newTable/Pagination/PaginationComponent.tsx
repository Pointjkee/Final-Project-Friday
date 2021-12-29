import * as React from 'react';
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getPack, setPageCount} from "../../../../../reducers/packReducer";
import {AppRootStateType} from "../../../../../store/store";

type PropsType = {
    text: string
}


export const PaginationComponent = ({text}:PropsType) => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(s => s.pack.cardPacksTotalCount)
    const min = useSelector<AppRootStateType, number>(s => s.pack.minCardsCount)
    const max = useSelector<AppRootStateType, number>(s => s.pack.maxCardsCount)
    const pageCount = useSelector<AppRootStateType, number>(s=>s.pack.pageCount)
    const pageStore = useSelector<AppRootStateType, number>(s => s.pack.page)
    const sortPacks = useSelector<AppRootStateType, string>(s => s.app.sortPacks)
    const meUserId = useSelector<AppRootStateType, string|null>(s=>s.profile.profile._id)
    const isMePack = useSelector<AppRootStateType, boolean>(s => s.app.isMePack)


    let user_id = "";
    if(meUserId !== null && isMePack){
        user_id = meUserId
    }

    const onClickPageItem = (pageNumber: number) => {
        if(pageNumber !== pageStore){
            dispatch(getPack({page: pageNumber,user_id,max:max,min:min,sortPacks, pageCount: pageCount, packName:text}))
        }
    }

    const changePageCount = (event: SelectChangeEvent<string>) => {
        if(+event.target.value !== pageCount){
            dispatch(setPageCount({pageSize: +event.target.value}))
            dispatch(getPack({pageCount: +event.target.value,max:max,min:min,user_id, packName:text,sortPacks}))
        }

    }


    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    return (
        <div>
            <div style={{margin: "15px 0", width: "90%", display: "flex", alignItems: "start"}}>

                <Pagination onChange={(event, page) => {
                    onClickPageItem(page)
                }}
                         page={pageStore} color={"primary"} count={pagesCount} shape="rounded"
                />


                <Select
                    style={{height: "32px", width: "80px"}}
                    size={"small"}
                    value={pageCount.toString()}
                    variant={"outlined"}
                    onChange={changePageCount}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>

            </div>
        </div>
    )
}