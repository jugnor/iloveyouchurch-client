import * as React from 'react';
import { Suspense, useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';

import { useTranslation } from 'react-i18next';
import { RegulationRecapInputForm } from './RegulationRecapInputForm';
import { Stack } from '@mui/material';
import {
  Regulation,
  UpsertRegulationRequest
} from '../../../../../models/Regulation';

import { AlertColor } from '@mui/material/Alert';
import { useRegulation } from '../../../../../hooks/useRegulation';
import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import { DeleteDialog } from '../../../../../shared/DeleteDialog';
import { AlertMessage } from '../../../../../shared/ArletMessageRenderer';

interface RegulationRecapProps {
  groupName: string;
}

export function RegulationBoard(regulationRecapProps: RegulationRecapProps) {
  const { createRegulation, updateRegulation, deleteRegulation, alertMessage } =
    useRegulation(regulationRecapProps.groupName);
  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [mode, setMode] = React.useState('');
  const { t } = useTranslation();

  const { data: regulation, mutate: regulationMutate } = useSWR<Regulation>(
    `/api/groups/${regulationRecapProps.groupName}/regulations`
  );

  const handleUpsertRegulation = useCallback(
    async (data: UpsertRegulationRequest) => {
      if (regulation) {
        console.log('data', data);
        return await updateRegulation(data);
      } else {
        return await createRegulation(data);
      }
    },
    [regulation, createRegulation, updateRegulation]
  );

  const handleRegulationForm = useCallback(
    async (data: UpsertRegulationRequest) => {
      handleUpsertRegulation(data).then((r) => {
        regulationMutate(r, true);
        setMode('');
        setSeverity('success');
        setAlert('Das Regulation Item wurde erfolgreich gespeichert');
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    },
    [regulation, handleUpsertRegulation, regulationMutate, alertMessage]
  );
  const deleteRegulationAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };

  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      deleteRegulation().then((r) => {
        regulationMutate(undefined, true);
        setMode('');
        setOpenAlert(true);
        setAlert('Das Regulation Item wurde erfolgreich gelöscht');
        setSeverity('success');
        setOpenDialog(false);
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    } else {
      setMode('');
    }
  };
  useEffect(() => {
    switch (mode) {
      case '':
        if (regulation) {
          setMode('update');
        }
        break;
    }
  }, [mode, regulation]);
  return (
    <Container>
      <Typography
        component="div"
        className={'program'}
        style={{ overflowY: 'auto', backgroundColor: '#F0F8FF' }}
      >
        {mode === 'update' && (
          <div>
            <Stack style={{ display: 'flex', marginLeft: '2em' }}>
              {' '}
              <Typography color={'red'}>
                <h2>
                  {t(
                    'Um positiv bewerten zu werden sollen die Nutzer die eingetragenen Zahlen pro Woche erreichen'
                  )}
                </h2>
              </Typography>{' '}
            </Stack>
            <Suspense fallback={null}>
              <RegulationRecapInputForm
                regulation={regulation}
                deleteRegulationAction={deleteRegulationAction}
                onSubmit={handleRegulationForm}
              />
            </Suspense>
          </div>
        )}

        {mode === '' && (
          <div style={{ marginLeft: '20rem', marginTop: '5em' }}>
            {' '}
            <Typography color={'red'}>
              {t('Es liegt momentan kein Regulation Item vor')}
            </Typography>{' '}
            <Button
              style={{ marginTop: '1em', display: 'flex' }}
              startIcon={<AddIcon />}
              variant="outlined"
              color={'primary'}
              aria-label={t(' Neues Regulation Item hinzufügen !!!')}
              onClick={() => setMode('update')}
            >
              Neues Regulation Item hinzufügen !!!
            </Button>
          </div>
        )}

        {mode === 'delete' && openDialog && (
          <DeleteDialog
            openDialog={openDialog}
            handleDeleteClick={handleDeleteClick}
          />
        )}
        {openAlert && severity !== undefined && (
          <AlertMessage
            openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            message={alert}
            severity={severity}
          />
        )}
      </Typography>
    </Container>
  );
}
