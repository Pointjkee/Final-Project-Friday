import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {deletePack} from "../../../reducers/packReducer";
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
type propsType = {
    text: string,
    packId: string
}

export default function ModalDelete(props: propsType) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpenDelete = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const clickDeletePack = () => {
        dispatch(deletePack({packName: props.text, id: props.packId}))
        setOpen(false)
    }

    return (
        <div>
            <Button style={{width: "30%"}} size={"small"} variant={"contained"} color={"error"} onClick={handleOpenDelete}>
                Delete
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" style={{display:"flex", justifyContent:"center"}}>
                        DELETE PACK?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 3, width:"100%"}} style={{display:"flex", gap: "20px",flexDirection:"column"}}>
                        <div style={{display:"flex",justifyContent:"center", gap: "10px"}}>
                            <Button variant={"contained"} color={"error"} size='small' onClick={clickDeletePack}>Delete</Button>
                            <Button variant={"contained"} color={"inherit"} size='small' onClick={handleClose}>Сancel</Button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}