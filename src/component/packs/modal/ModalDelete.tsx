import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {deletePack} from "../../../reducers/packReducer";
import {useDispatch} from "react-redux";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
            <Button onClick={handleOpenDelete} style={{color: 'black'}} size='small'>Delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Удалить колоду?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                      <span>
                          <Button size='small' onClick={clickDeletePack}>Да</Button>
                          <Button size='small' onClick={handleClose}>Нет</Button>
                      </span>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}