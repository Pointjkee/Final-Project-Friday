import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {deleteCard} from "../../../reducers/cardReducer";

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
type DeletePopupPropsType = {
    cardId:string
    cardsPack_id:string
}

export default function DeletePopup({cardId,cardsPack_id}:DeletePopupPropsType) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpenDelete = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const clickDeletePack = () => {
        dispatch(deleteCard(cardId,cardsPack_id))
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleOpenDelete} style={{color: 'white'}} size='small'>Delete</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                      <span>
                          <Button size='small' onClick={clickDeletePack}>Yes</Button>
                          <Button size='small' onClick={handleClose}>I changed my mind</Button>
                      </span>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};