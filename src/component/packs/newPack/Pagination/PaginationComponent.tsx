import * as React from 'react';
import {MenuItem, Pagination, Select, SelectChangeEvent} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getPack, setCurrentPage, setPageCount} from "../../../../reducers/packReducer";
import {AppRootStateType} from "../../../../store/store";



export const PaginationComponent = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(s => s.pack.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(s => s.pack.page)
    const pageCount = useSelector<AppRootStateType, number>(s=>s.pack.pageCount)

    const onPageChanged = (pageNumber: number) => {
        dispatch(getPack({page: pageNumber, pageCount: pageCount}))
        dispatch(setCurrentPage({page: pageNumber}))
    }

    const changePage = (event: SelectChangeEvent<string>) => {
        dispatch(setPageCount({pageSize: +event.target.value}))
    }

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

    return (
        <div>
            <div style={{margin: "15px auto 0 auto", width: "90%", display: "flex", alignItems: "center"}}>

                <Pagination onChange={(event, page) => {
                    onPageChanged(page)
                }}
                            color={"primary"} count={pagesCount} shape="rounded"
                />


                <Select
                    style={{height: "32px", width: "80px"}}
                    size={"small"}
                    value={pageCount.toString()}
                    variant={"outlined"}
                    onChange={changePage}
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