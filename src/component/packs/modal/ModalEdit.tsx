import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ChangeEvent, useState, KeyboardEvent} from "react";
import {useDispatch} from "react-redux";
import {updatePack} from "../../../reducers/packReducer";
import {TextField} from "@material-ui/core";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "8px",
    width: 400,
    bgcolor: '#ECECF9',
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
            <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"success"} onClick={handleOpen}>
            Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" style={{display:"flex", justifyContent:"center"}}>
                        NEW NAME
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 3, width:"100%"}} style={{display:"flex", gap: "20px",flexDirection:"column"}}>
                        <TextField color={"success"} variant={"standard"} size={"small"} onChange={onChangeHandler} value={name} onKeyPress={onKeyPressHandler}/>
                        <div style={{display:"flex",justifyContent:"center", gap: "10px"}}>
                            <Button variant={"contained"} color={"success"} size='small' onClick={upTitleHandler}>Edit</Button>
                            <Button variant={"contained"} color={"inherit"} size='small' onClick={handleClose}>Сancel</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}