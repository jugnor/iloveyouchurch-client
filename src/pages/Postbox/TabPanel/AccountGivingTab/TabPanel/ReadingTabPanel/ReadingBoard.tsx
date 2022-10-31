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
  Reading,
  ReadingType,
  UpsertReadingRequest,
  UpsertReadingRequestSchema
} from '../../../../../../models/Reading';
import { ReadingInputField } from './ReadingInputField';

export interface ReadingBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function ReadingBoard(readingBoardProps: ReadingBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    readingBoardProps.postboxId,
    readingBoardProps.userId,
    readingBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [readingType, setReadingType] = useState<SelectElement>(
    ReadingType.C_BOOK
  );
  const [reading, setReading] = useState<Reading>();

  const { data: readingData } = useSWR<Reading>(
    `/postboxes/${readingBoardProps.postboxId}/prayers?` +
      `readingType=${readingType}&weekOfYear=${weekOfYear}`
  );
  const handleReadingForm = (readingForm: Map<string, any>) => {
    const upsertReadingRequest = {
      timeInMinute: readingForm.get('timeInMinute'),
      totalCap: readingForm.get('totalCap'),
      title: readingForm.get('title'),
      referenceEnd: readingForm.get('referenceEnd'),
      theEnd: readingForm.get('theEnd'),

      theme: readingForm.get('theme'),
      readingType: readingType,
      weekOfYear: weekOfYear
    } as UpsertReadingRequest;

    const error =
      UpsertReadingRequestSchema.validate(upsertReadingRequest).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (reading === undefined) {
        setAlert(
          'Das neue Reading Item konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das Reading Item von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertReadingRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (reading === undefined) {
        setAlert('Das neue Reading Item wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Reading Item von Kalenderwoche ' +
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
      if (reading !== undefined) {
        deleteDiscipline(reading?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Reading Item wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deleteReadingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (readingData !== undefined && readingData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setReading(readingData);
    }
  }, [mode, readingData]);
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
              setElement={setReadingType}
              element={readingType}
              menuItems={readingBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <ReadingInputField
              deleteReadingAction={deleteReadingAction}
              readingType={readingType as ReadingType}
              reading={readingData}
              handleReadingForm={handleReadingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Reading Item hinzufügen !!!
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
