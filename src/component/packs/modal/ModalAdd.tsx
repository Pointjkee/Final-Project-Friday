import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {addPack} from "../../../reducers/packReducer";
import {useDispatch} from "react-redux";
import {TextField} from "@material-ui/core";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "8px",
    bgcolor: '#ECECF9',
    boxShadow: 24,
    p: 4,
};

export const ModalAdd = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            upTitleHandler()
        }
    }
    const upTitleHandler = () => {
        dispatch(addPack({cardsPack: {name} }))
        setOpen(false)
    }
    return (
        <div>
            <Button onClick={handleOpen} variant={"contained"}  size='small'>Add pack</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" style={{display:"flex", justifyContent:"center"}}>
                        ADD NEW PACK
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 3, width:"100%"}} style={{display:"flex", gap: "20px",flexDirection:"column"}}>
                        <TextField color={"success"} variant={"standard"} size={"small"} onChange={onChangeHandler} value={name} onKeyPress={onKeyPressHandler}/>
                        <div style={{display:"flex",justifyContent:"center", gap: "10px"}}>
                            <Button variant={"contained"} color={"success"} size='small' onClick={upTitleHandler}>Add</Button>
                            <Button variant={"contained"} color={"inherit"} size='small' onClick={handleClose}>Сancel</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}