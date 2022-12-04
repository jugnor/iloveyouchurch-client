import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';
import {
  CalenderWeekRenderer,
  getWeekNumber
} from '../../../../../../app/CalendarWeekRenderer';
import { startOfISOWeek } from 'date-fns';
import { SelectElement, SelectItem } from '../../../../../../app/SelectItem';
import { Button, FormControl } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { now } from '@mui/x-data-grid/lib/lodash/date';
import { DeleteDialog } from '../../../../../../shared/DeleteDialog';
import { useDiscipline } from '../../../../../../hooks/useDiscipline';
import { AlertMessage } from '../../../../../../app/ArletMessageRenderer';
import { AlertColor } from '@mui/material/Alert';
import {
  Meditation,
  RetreatType,
  UpsertMeditationRequest
} from '../../../../../../models/Meditation';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { MeditationInputForm } from './MeditationInputForm';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

export interface MeditationBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function MeditationBoard(meditationBoardProps: MeditationBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    meditationBoardProps.postboxId,
    meditationBoardProps.userId,
    meditationBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('create');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [retreatType, setRetreatType] = useState<SelectElement>(
    RetreatType.MEDITATION
  );
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(retreatType as RetreatType);

  const {
    data: meditationData,
    mutate: mutateMeditation,
    isValidating: isValidatingMediation
  } = useSWR<Meditation>(
    `/postboxes/${meditationBoardProps.postboxId}/meditations?` +
      `retreatType=${retreatType}&weekOfYear=${weekOfYear}`
  );
  const handleMeditationForm = useCallback(
    async (data: UpsertMeditationRequest) => {
      await createDiscipline(data).then((r) => {
        mutateMeditation(meditationData, true);
        setSeverity('success');
        setAlert(
          'Das ' + translateType() + ' Item wurde erfolgreich gespeichert'
        );
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    },
    [createDiscipline]
  );
  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      if (meditationData !== undefined) {
        deleteDiscipline(meditationData?.id).then((r) => {
          mutateMeditation(undefined, true);
          setMode('create');
          setOpenAlert(true);
          setAlert(
            'Das ' + translateType() + ' Item wurde erfolgreich gelöscht'
          );
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('create');
        setSeverity('error');
      }
      setOpenAlert(true);
    } else {
      setMode('edit');
    }
  };
  const deleteMeditationAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };

  const handleWeekOfYear = (weekOfYear: number) => {
    setMode('create');
    setWeekOfYear(weekOfYear);
  };
  const handleRetreatType = (element: SelectElement) => {
    setMode('create');
    setRetreatType(element);
  };
  useEffect(() => {
    switch (mode) {
      case 'create':
        if (meditationData !== undefined) {
          setMode('edit');
        }
        break;
    }
  }, [mode, meditationData, weekOfYear]);
  return (
    <Container>
      <Typography
        component="div"
        className={'program'}
        style={{ overflowY: 'auto', display: 'block',backgroundColor: '#F0F8FF' }}
      >
        <div style={{ display: 'flex' }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">KW</InputLabel>
            <MenuItem style={{ backgroundColor: '#1976d2', color: 'white' }}>
              {weekOfYear}
            </MenuItem>
          </FormControl>

          <CalenderWeekRenderer setWeekOfYear={handleWeekOfYear} />
          <SelectItem
            setElement={handleRetreatType}
            element={retreatType}
            menuItems={meditationBoardProps.menuItems}
          />
        </div>

        {mode === 'edit' && (
          <div>
            <MeditationInputForm
              deleteMeditationAction={deleteMeditationAction}
              meditation={meditationData}
              onSubmit={handleMeditationForm}
              weekOfYear={weekOfYear}
              retreatType={retreatType as RetreatType}
            />
          </div>
        )}
        {mode === 'create' && (
          <div style={{ marginLeft: '20rem' , marginTop: '5em'}}>
            {' '}
            <Typography color={'red'}>
              {t(
                'Sie haben diese Woche noch kein ' +
                  translateType() +
                  ' Item gebucht'
              )}
            </Typography>{' '}
            <Button
              style={{ marginTop: '1em', marginLeft: '2rem', display: 'flex' }}
              startIcon={<AddIcon />}
              variant="outlined"
              color={'primary'}
              aria-labelledby={
                'Neues ' + translateType() + ' Item hinzufügen !!!'
              }
              aria-label={t(
                ' Neues ' + translateType() + ' Item hinzufügen !!!'
              )}
              onClick={() => setMode('edit')}
            >
              Neues {translateType()} Item hinzufügen !!!
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
