import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {setCard} from "../../../../reducers/cardReducer";
import {useForm} from "react-hook-form";
import s from "../../../profile/Profile.module.css";
import {Input} from "@mui/material";
import {NewCardsType} from "../../../../api/types";

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

type PropsPopupType={
    cardsPack_id:string|undefined
    maxGrade:number
    minGrade:number
}


export default function AddPopup({ cardsPack_id}:PropsPopupType) {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const {register,formState: { errors }, handleSubmit,reset} = useForm()

    const onSubmit = handleSubmit((data:NewCardsType) => {
        const{ question,answer} = data
        dispatch(setCard({cardsPack_id,question,answer}))
        handleClose()
        reset()
    });

    const onCancelClick = () =>{
        handleClose()
        reset()
    }


    return (
        <div>
            <Button onClick={handleOpen} style={{color: 'white'}} size='small'>Add Card</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Card Info
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <form className={s.form} onSubmit={onSubmit}>
                            <div className={s.info_form}>
                                <span>Question</span>
                                <Input {...register('question',{ required: true })}/>
                                {errors.question && <p style={{color:'red',fontSize:'12px'}}>This field is Required</p>}
                                <span>Answer</span>
                                <Input {...register('answer',{ required: true })}/>
                                {errors.answer && <p style={{color:'red',fontSize:'12px'}}>This field is Required</p>}
                            </div>
                            <div className={s.button}>
                                <Button  variant="contained" color="secondary" onClick={onCancelClick}>Cancel</Button>
                                <Button  variant="contained" color="primary" type="submit">Save</Button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}