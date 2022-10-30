import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

interface DeleteDialogProps {
  openDialog: boolean;
  handleDeleteClick: (shouldDelete: boolean) => void;
}

export function DeleteDialog({
  openDialog,
  handleDeleteClick
}: DeleteDialogProps) {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      {openDialog && (
        <div>
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleDeleteClick(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{'Änderung Übernehmen'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Willst du wirklich diese Daten löschen? Es besteht keine
                Möglichkeit mehr die gelöschten Daten zurückzusetzen
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDeleteClick(false)}>
                Nein, Zurück
              </Button>
              <Button onClick={() => handleDeleteClick(true)}>
                Ja, ich will
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
