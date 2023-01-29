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
  Gospel,
  GospelType,
  UpsertGospelRequest
} from '../../../../../../models/Gospel';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { GospelInputForm } from './GospelInputForm';

export interface GospelBoardBoardProps {
  groupName: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function GospelBoard(gospelBoardBoardProps: GospelBoardBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    gospelBoardBoardProps.groupName,
    gospelBoardBoardProps.userId,
    gospelBoardBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));
  const { t } = useTranslation();

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('create');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [gospelType, setGospelType] = useState<SelectElement>(
    GospelType.GOSPEL
  );
  const { translateType } = useDisciplineType(gospelType as GospelType);

  const { data: gospelData, mutate: mutateGospel } = useSWR<Gospel>(
    `/api/groups/${gospelBoardBoardProps.groupName}/gospels?` +
      `gospelType=${gospelType}&weekOfYear=${weekOfYear}`
  );

  const handleGospelType = (element: SelectElement) => {
    setMode('create');
    setGospelType(element);
  };
  const handleGospelForm = useCallback(
    async (data: UpsertGospelRequest) => {
      await createDiscipline(data).then((r) => {
        mutateGospel(gospelData, true);
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
      if (gospelData !== undefined) {
        deleteDiscipline(gospelData?.id).then((r) => {
          mutateGospel(undefined, true);
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
  const deleteGospelAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };

  const handleWeekOfYear = (weekOfYear: number) => {
    setMode('create');
    setWeekOfYear(weekOfYear);
  };

  useEffect(() => {
    switch (mode) {
      case 'create':
        if (gospelData !== undefined) {
          setMode('edit');
        }
        break;
    }
  }, [mode, gospelData, weekOfYear]);
  return (
    <Container>
      <Typography
        component="div"
        className={'program'}
        style={{
          overflowY: 'auto',
          display: 'block',
          backgroundColor: '#F0F8FF'
        }}
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
            setElement={handleGospelType}
            element={gospelType}
            menuItems={gospelBoardBoardProps.menuItems}
          />
        </div>

        {mode === 'edit' && (
          <div>
            <GospelInputForm
              deleteGospelAction={deleteGospelAction}
              gospelType={gospelType as GospelType}
              gospel={gospelData}
              weekOfYear={weekOfYear}
              onSubmit={handleGospelForm}
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