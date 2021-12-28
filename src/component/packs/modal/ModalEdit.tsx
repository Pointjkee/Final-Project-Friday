import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {useDispatch} from "react-redux";
import {updatePack} from "../../../reducers/packReducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "8px",
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
type propsType = {
    title: string,
    packId: string
}

export default function ModalEdit(props: propsType) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            upTitleHandler()
        }
    }
    const upTitleHandler = () => {
        dispatch(updatePack({
            cardsPack: {
                _id: props.packId,
                name: name
            }
        }))
        setOpen(false)
    }

    return (
        <div>
            <Button style={{color: 'black'}} size='small' onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Новое название
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