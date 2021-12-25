import * as React from 'react';
import style from './CustomTable.module.css'
import {Pagination, Paper, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SearchIcon from "@mui/icons-material/Search";
import {Row} from "./tableRow";


export const CustomTable = () => {
    let array = [
        {name: "lololololo", cards: 5, data: "18.03.2020", createdBy: "Alex"},
        {name: "sfsf", cards: 1, data: "18.03.2020", createdBy: "Alex"},
        {name: "ssssssssss", cards: 2, data: "18.03.2020", createdBy: "Alex"},
        {name: "jhhhhhhhhh", cards: 3, data: "18.03.2020", createdBy: "Alex"},
        {name: "jhjhjhj", cards: 4, data: "18.03.2020", createdBy: "Alex"},
        {name: "mnngvn", cards: 5, data: "18.03.2020", createdBy: "Alex"},
        {name: "34343", cards: 6, data: "18.03.2020", createdBy: "Alex"},
        {name: "kllklkl", cards: 7, data: "18.03.2020", createdBy: "Alex"},
    ]
    return (
        <div>
            <Paper className={style.ContainerTable} elevation={3}>
                <div className={style.content}>
                    <h2>Packs list</h2>
                    <div className={style.interface}>
                        <TextField/>
                        <Button variant={"contained"}>
                            <SearchIcon/>
                        </Button>
                    </div>
                    <Paper style={{boxShadow: "#bde0ea 10px 5px 10px"}}>
                        <div className={style.tableHeader}>
                            <div style={{textAlign: "start", marginLeft: "30px", width: "80%"}}>Name</div>
                            <div style={{width: "30%"}}>Cards</div>
                            <div style={{width: "70%"}}>Last Updated</div>
                            <div style={{width: "70%"}}>Created by</div>
                            <div style={{textAlign: "start", width: "80%"}}>Actions</div>
                        </div>

                        {array.map(s => {
                            return <Row name={s.name}
                                        cards={s.cards}
                                        update={s.data}
                                        createdName={s.createdBy}
                            />
                        })}


                    </Paper>
                </div>

                <div style={{margin: "15px auto 0 auto", width: "90%"}}>
                    <Pagination color={"primary"} count={10} shape="rounded"/>
                </div>
            </Paper>
        </div>
    )
}