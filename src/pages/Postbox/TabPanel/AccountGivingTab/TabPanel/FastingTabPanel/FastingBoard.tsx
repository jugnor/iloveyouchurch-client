import * as React from 'react';
import {
  Fasting,
  FastingType,
  UpsertFastingRequest,
  UpsertFastingRequestSchema
} from '../../../../../../models/Fasting/Fasting';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import { FastingInputField } from './FastingInputField';
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

export interface FastingBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function FastingBoard(fastingBoardProps: FastingBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    fastingBoardProps.postboxId,
    fastingBoardProps.userId,
    fastingBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [fastingType, setFastingType] = useState<SelectElement>(
    FastingType.PARTIAL
  );
  const [fasting, setFasting] = useState<Fasting>();

  const { data: fastingData } = useSWR<Fasting>(
    `/postboxes/${fastingBoardProps.postboxId}/fastings?` +
      `fastingType=${fastingType}&weekOfYear=${weekOfYear}`
  );
  const handleFastingForm = (fastingForm: Map<string, any>) => {
    const upsertFastingRequest = {
      days: fastingForm.get('days'),
      goal: fastingForm.get('goal'),
      fastingType: fastingType,
      weekOfYear: weekOfYear
    } as UpsertFastingRequest;

    const error =
      UpsertFastingRequestSchema.validate(upsertFastingRequest).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (fasting === undefined) {
        setAlert(
          'Das neue Fasting Item konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das Fasting Item von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertFastingRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (fasting === undefined) {
        setAlert('Das Fasting neue Item wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Fasting Item von Kalenderwoche ' +
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
      if (fasting !== undefined) {
        deleteDiscipline(fasting?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Fasting Item wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deleteFastingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (fastingData !== undefined && fastingData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setFasting(fastingData);
    }
  }, [mode, fastingData]);
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
              setElement={setFastingType}
              element={fastingType}
              menuItems={fastingBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <FastingInputField
              deleteFastingAction={deleteFastingAction}
              fasting={fastingData}
              handleFastingForm={handleFastingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Fasting Item hinzufügen !!!
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
