import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertColor, AlertProps} from '@mui/material/Alert';
import {ActivityType} from "../models/ActivityType";

export const  Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export let  openAlert = false;
export function setOpenAlert (op:boolean){
  openAlert=op;
}
interface CustomizedSnackbarsProps {
 message:string,
  severity:AlertColor
}
export  function CustomizedSnackbars({message,severity}:CustomizedSnackbarsProps) {
  //
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={20} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
