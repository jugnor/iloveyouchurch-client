import * as React from 'react';
import { useState } from 'react';
import { Snackbar, Stack } from '@mui/material';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface AlertMessageProps {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  message: string;
  severity: AlertColor;
}

export function AlertMessage({
  openAlert,
  setOpenAlert,
  message,
  severity
}: AlertMessageProps) {
  const [open, setOpen] = useState(openAlert);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
