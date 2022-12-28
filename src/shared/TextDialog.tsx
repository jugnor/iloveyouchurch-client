import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import { Box, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

interface TextDialogProps {
  openDialog: boolean;
  textDialog: string;
  handleText: (openDialog: boolean, text: string) => void;
}

export function TextDialog({
  openDialog,
  textDialog,
  handleText
}: TextDialogProps) {
  const { t } = useTranslation();
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
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 5, width: '500%' }
          }}
          noValidate
          autoComplete="off"
          overflow="scroll"
        >
          <Dialog
            maxWidth={'md'}
            fullWidth
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => handleText(false, '')}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>Information</DialogTitle>
            <DialogContent>
              <Stack>
                <textarea id="name" value={textDialog}></textarea>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </>
  );
}
