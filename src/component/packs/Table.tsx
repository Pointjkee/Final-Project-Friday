import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useDispatch, useSelector} from "react-redux";
import {ChangeEvent, useEffect, useState} from "react";
import {cardPacksType, deletePack, getPack} from "../../reducers/packReducer";
import {AppRootStateType} from "../../store/store";
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import {TextField} from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';

const columns: GridColDef[] = [
    // {field: 'id', headerName: 'ID', width: 70 },
    {field: 'name', headerName: 'Name pack', width: 650, sortable: false, disableColumnMenu: false},
    {
        field: 'cardsCount',
        headerName: 'Cards count',
        type: 'number',
        width: 150,
        align: 'center',
        disableColumnMenu: true
    },
    {field: 'updated', headerName: 'Updated', width: 260, disableColumnMenu: true},
    {
        field: 'actions',
        headerName: 'Actions',
        width: 230,
        align: 'right',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
            const onClick2 = () => {
                return alert('to be continued')
            }

            return <span>
                <NavLink to={'/cards/' + params.id} style={{textDecoration: 'none'}}><Button style={{color: 'black', border: "1px black solid", marginRight: 5}}
                                                                                             variant='outlined' size='small'>Cards</Button></NavLink>
                <Button style={{color: 'black', border: "1px black solid"}} variant='outlined' size='small' onClick={onClick2}>Click2</Button>
            </span>
        },
    }
];

export default function DataTable() {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPack())
    }, [])

    function createData(id: string, name: string, cardsCount: number, updated: string, actions: string) {
        return {id, name, cardsCount, updated, actions};
    }

    const packs = useSelector<AppRootStateType, cardPacksType>(state => state.pack.cardPacks)
    let rows = packs.map((t) => {
        return createData(t._id, t.name, t.cardsCount, t.updated, 'add')
    })

    const changeTextFieldValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value)
    }

    const searchPack = () =>{
        dispatch(getPack({packName:value}))
    }

    return (
        <div style={{height: 480, width: '100%'}}>
            <div style={{display: "flex", justifyContent: "start",margin:"0 0 10px 10px", gap:"2px"}}>
                <TextField value={value} onChange={changeTextFieldValue} size={"small"} />
                <Button onClick={searchPack} variant={"contained"}>
                    <SearchIcon/>
                </Button>
            </div>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={7}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
            />
        </div>
    );
}