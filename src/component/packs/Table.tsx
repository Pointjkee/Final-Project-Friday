import * as React from 'react';
import {DataGrid, GridApi, GridCellValue, GridColDef} from '@mui/x-data-grid';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {cardPacksType, getPack} from "../../reducers/packReducer";
import {AppRootStateType} from "../../store/store";
import Button from '@material-ui/core/Button';

const columns: GridColDef[] = [
    // {field: 'id', headerName: 'ID', width: 70 },
    {field: 'name', headerName: 'Name pack', width: 650, sortable: false, disableColumnMenu: true},
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
        width: 140,
        align: 'right',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
                api
                    .getAllColumns()
                    .filter((c) => c.field !== '__check__' && !!c)
                    .forEach(
                        (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
                    );
                return alert(JSON.stringify(thisRow, null, 4));
            };
            return <Button onClick={onClick}>Click</Button>;
        },
    }
];
export default function DataTable() {
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

    return (
        <div style={{height: 480, width: '100%'}}>
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