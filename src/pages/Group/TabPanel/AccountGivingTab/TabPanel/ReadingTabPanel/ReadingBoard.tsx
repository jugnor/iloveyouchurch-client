import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import useSWR from 'swr';
import {
  CalenderWeekRenderer,
  getWeekNumber
} from '../../../../../../shared/CalendarWeekRenderer';
import { startOfISOWeek } from 'date-fns';
import { SelectElement, SelectItem } from '../../../../../../shared/SelectItem';
import { Button, FormControl } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { now } from '@mui/x-data-grid/lib/lodash/date';
import { DeleteDialog } from '../../../../../../shared/DeleteDialog';
import { useDiscipline } from '../../../../../../hooks/useDiscipline';
import { AlertMessage } from '../../../../../../shared/ArletMessageRenderer';
import { AlertColor } from '@mui/material/Alert';
import {
  Reading,
  ReadingType,
  UpsertReadingRequest
} from '../../../../../../models/Reading';
import { ReadingInputForm } from './ReadingInputForm';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';

export interface ReadingBoardProps {
  groupName: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function ReadingBoard(readingBoardProps: ReadingBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline, loading } =
    useDiscipline(
      readingBoardProps.groupName,
      readingBoardProps.userId,
      readingBoardProps.path
    );
  const { t } = useTranslation();

  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('create');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [readingType, setReadingType] = useState<SelectElement>(
    ReadingType.BIBLE
  );
  const { translateType } = useDisciplineType(readingType as ReadingType);

  const {
    data: readingData,
    mutate: mutateReading,
    isValidating: isValidatingReading
  } = useSWR<Reading>(
    `/api/groups/${readingBoardProps.groupName}/readings?` +
      `readingType=${readingType}&weekOfYear=${weekOfYear}`
  );

  const handleReadingForm = useCallback(
    async (data: UpsertReadingRequest) => {
      await createDiscipline(data).then((r) => {
        mutateReading(readingData, true);
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
      if (readingData !== undefined) {
        deleteDiscipline(readingData?.id).then((r) => {
          mutateReading(undefined, true);
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
  const deleteReadingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  const handleWeekOfYear = (weekOfYear: number) => {
    setMode('create');
    setWeekOfYear(weekOfYear);
  };
  const handleReadingType = (element: SelectElement) => {
    setMode('create');
    setReadingType(element);
  };
  useEffect(() => {
    switch (mode) {
      case 'create':
        if (readingData !== undefined) {
          setMode('edit');
        }
        break;
    }
  }, [mode, readingData, weekOfYear]);
  return (
    <Container>
      {isValidatingReading && <CircularProgress />}
      <Typography
        component="div"
        className={'program'}
        style={{
          overflowY: 'auto',
          display: 'block',
          backgroundColor: '#F0F8FF'
        }}
      >
        <div>
          <div style={{ display: 'flex' }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">KW</InputLabel>
              <MenuItem style={{ backgroundColor: '#1976d2', color: 'white' }}>
                {weekOfYear}
              </MenuItem>
            </FormControl>

            <CalenderWeekRenderer setWeekOfYear={handleWeekOfYear} />
            <SelectItem
              setElement={handleReadingType}
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
              loading={loading}
              onSubmit={handleReadingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <div style={{ marginLeft: '20rem', marginTop: '5em' }}>
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