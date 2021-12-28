import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {addPack} from "../../../reducers/packReducer";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "8px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalAdd() {
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
        dispatch(addPack({
            packName: name, data: {
                cardsPack: {
                    name
                }
            }
        }))
        setOpen(false)
    }
    return (
        <div>
            <Button onClick={handleOpen} style={{color: 'white'}} size='small'>Add pack</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Название пака
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <input onChange={onChangeHandler} value={name} onKeyPress={onKeyPressHandler}/>
                        <Button size='small' onClick={upTitleHandler}>Ок</Button>
                        <Button size='small' onClick={handleClose}>Нет</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}