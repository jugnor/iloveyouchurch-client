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
import {ReadingInputForm} from "./ReadingInputForm";
import {GodGivingType} from "../../../../../../models/GodGiving";
import {useDisciplineType} from "../../../../../../hooks/useDisciplineType";

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
  const {translateType} = useDisciplineType(readingType as ReadingType) ;

  const { data: readingData,mutate:mutateReading } = useSWR<Reading>(
    `/postboxes/${readingBoardProps.postboxId}/readings?` +
      `readingType=${readingType}&weekOfYear=${weekOfYear}`
  );

  const handleReadingForm = (data:UpsertReadingRequest) => {
    createDiscipline(data).then((r) => {
      mutateReading(readingData,true)
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
            <ReadingInputForm
              deleteReadingAction={deleteReadingAction}
              readingType={readingType as ReadingType}
              reading={readingData}
              weekOfYear={weekOfYear}
              loading={}
              onSubmit={handleReadingForm}
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
