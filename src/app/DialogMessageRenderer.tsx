import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as React from 'react';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

interface DialogMessageRendererProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  params: any;
  handleDeleteClick: (
    params: GridRenderCellParams
  ) => (event: { stopPropagation: () => void }) => void;
}

export function DialogMessageRenderer({
  openDialog,
  setOpenDialog,
  params,
  handleDeleteClick
}: DialogMessageRendererProps) {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
      {openDialog && params && (
        <div>
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{'Änderung Übernehmen'}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Willst du wirklich die Daten löschen? Es besteht keine
                Möglichkeit mehr die gelöschten Daten zurückzusetzen
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Nein, Zurück</Button>
              <Button onClick={handleDeleteClick(params)}>Ja, ich will</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
