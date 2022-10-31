import * as React from 'react';
import { useEffect, useState } from 'react';
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
  UpsertMeditationRequest,
  UpsertMeditationRequestSchema
} from '../../../../../../models/Meditation';
import { MeditationInputField } from '../Meditation/MeditationInputField';

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
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [retreatType, setRetreatType] = useState<SelectElement>(
    RetreatType.MEDITATION
  );
  const [meditation, setMeditation] = useState<Meditation>();

  const { data: meditationData } = useSWR<Meditation>(
    `/postboxes/${meditationBoardProps.postboxId}/meditations?` +
      `retreatType=${retreatType}&weekOfYear=${weekOfYear}`
  );
  const handleMeditationForm = (meditationForm: Map<string, any>) => {
    const upsertMeditationRequest = {
      timeInMinute: meditationForm.get('timeInMinute'),
      theme: meditationForm.get('theme'),
      verse: meditationForm.get('verse'),
      retreatType: retreatType,
      weekOfYear: weekOfYear
    } as UpsertMeditationRequest;

    const error = UpsertMeditationRequestSchema.validate(
      upsertMeditationRequest
    ).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (meditation === undefined) {
        setAlert(
          'Das neue Item Meditation konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das Item Meditation von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertMeditationRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (meditation === undefined) {
        setAlert('Das neue Item Meditation wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Item Meditation von Kalenderwoche ' +
            weekOfYear +
            ' wurde erfolgreich geändert'
        );
      }
    });
    if (alertMessage !== '') {
      setAlert(alertMessage);
      setMode('');
      setSeverity('error');
    }
    setOpenAlert(true);
  };
  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      if (meditation !== undefined) {
        deleteDiscipline(meditation?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Item Meditation wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deleteMeditationAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (meditationData !== undefined && meditationData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setMeditation(meditationData);
    }
  }, [mode, meditationData]);
  return (
    <Container>
      <Typography
        component="div"
        className={'program'}
        style={{ overflowY: 'auto' }}
      >
        <div style={{ display: 'flex' }}>
          <div
            style={{ marginLeft: 400, display: 'flex', flexDirection: 'row' }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">KW</InputLabel>
              <MenuItem style={{ backgroundColor: '#1976d2', color: 'white' }}>
                {weekOfYear}
              </MenuItem>
            </FormControl>

            <CalenderWeekRenderer setWeekOfYear={setWeekOfYear} />
            <SelectItem
              setElement={setRetreatType}
              element={retreatType}
              menuItems={meditationBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <MeditationInputField
              deleteMeditationAction={deleteMeditationAction}
              meditation={meditationData}
              handleMeditationForm={handleMeditationForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Meditation Item hinzufügen !!!
          </Button>
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
