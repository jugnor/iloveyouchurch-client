import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GospelAction from "../gospel/GospelAction";
import GospelContactAction from "../gospel/GospelContactAction";
import Support from "../gospel/SupportAction";


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          <h1>Verteilung bei der Evangelisation</h1>
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Evangelisation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>

            <div><Support/></div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Zurück</Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}
