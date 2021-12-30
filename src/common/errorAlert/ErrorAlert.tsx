import * as React from 'react';
import {Snackbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {setErrorMessage} from "../../reducers/appReducer";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorAlert() {

    const error = useSelector<AppRootStateType, string>(state => state.app.errorMessage)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorMessage(""))
    };


    const isOpen = error !== ""

    return (
        <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}