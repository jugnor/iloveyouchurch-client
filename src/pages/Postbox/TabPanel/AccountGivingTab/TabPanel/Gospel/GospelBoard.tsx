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
  Gospel,
  GospelType,
  isGospelValidationOk,
  UpsertGospelRequest,
  UpsertGospelRequestSchema
} from '../../../../../../models/Gospel';
import { GospelInputField } from './GospelInputField';
import AddIcon from '@mui/icons-material/Add';

export interface GospelBoardBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function GospelBoard(gospelBoardBoardProps: GospelBoardBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    gospelBoardBoardProps.postboxId,
    gospelBoardBoardProps.userId,
    gospelBoardBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('create');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [gospelType, setGospelType] = useState<SelectElement>(
    GospelType.GOSPEL
  );

  const { data: gospelData, mutate: mutateGospel } = useSWR<Gospel>(
    `/postboxes/${gospelBoardBoardProps.postboxId}/gospels?` +
      `gospelType=${gospelType}&weekOfYear=${weekOfYear}`
  );

  const translateType = () => {
    switch (gospelType) {
      case GospelType.GOSPEL:
        return 'Evangelisation';
      case GospelType.SUPPORT:
        return 'Support';
      case GospelType.CONTACT:
        return 'Kontakt';
    }
  };

  const handleWeekOfYear = (weekOfYear: number) => {
    setMode('create');
    setWeekOfYear(weekOfYear);
  };
  const handleGodGivingType = (element: SelectElement) => {
    setMode('create');
    setGospelType(element);
  };
  const handleGospelForm = (gospelForm: Map<string, any>) => {
    let upsertGospelRequest0;
    switch (gospelType) {
      case GospelType.GOSPEL:
        upsertGospelRequest0 = {
          timeInMinute: gospelForm.get('timeInMinute'),
          total: gospelForm.get('total'),
          goal: gospelForm.get('goal'),
          gospelType: gospelType,
          weekOfYear: weekOfYear
        } as UpsertGospelRequest;
        break;
      case GospelType.SUPPORT:
        upsertGospelRequest0 = {
          total: gospelForm.get('total'),
          gospelSupport: {
            title: gospelForm.get('title'),
            supportType: gospelForm.get('supportType')
          },
          gospelType: gospelType,
          weekOfYear: weekOfYear
        } as UpsertGospelRequest;
        break;
      case GospelType.CONTACT:
        upsertGospelRequest0 = {
          gospelContact: {
            name: gospelForm.get('name'),
            email: gospelForm.get('email'),
            telephone: gospelForm.get('telephone'),
            city: gospelForm.get('city')
          },
          gospelType: gospelType,
          weekOfYear: weekOfYear
        } as UpsertGospelRequest;
        break;
    }
    const upsertGospelRequest = upsertGospelRequest0 as UpsertGospelRequest;
    console.log('jet', isGospelValidationOk(upsertGospelRequest));
    if (!isGospelValidationOk(upsertGospelRequest)) {
      setMode('create');
      setSeverity('error');
      if (gospelData === undefined) {
        setAlert(
          'Das neue ' +
            translateType() +
            ' Item konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das ' +
            translateType() +
            ' Item von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    } else {
      createDiscipline(upsertGospelRequest).then((r) => {
        mutateGospel(gospelData, true);
        setSeverity('success');

        setAlert(
          'Das ' +
            translateType() +
            ' Item von Kalenderwoche ' +
            weekOfYear +
            ' wurde erfolgreich geändert'
        );
      });
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('create');
        setSeverity('error');
      }
    }
    setOpenAlert(true);
  };
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
        setOpenDialog(false);
      }
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setSeverity('error');
        setMode('create');
      }
      setOpenAlert(true);
      setMode('create');
    }
  };
  const deleteGospelAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    console.log('Mode', mode);
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
        style={{ overflowY: 'auto', display: 'block' }}
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
            setElement={handleGodGivingType}
            element={gospelType}
            menuItems={gospelBoardBoardProps.menuItems}
          />
        </div>

        {mode === 'edit' && (
          <div>
            <GospelInputField
              deleteGospelAction={deleteGospelAction}
              gospelType={gospelType as GospelType}
              gospel={gospelData}
              handleGospelForm={handleGospelForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <div style={{ marginLeft: '20rem' }}>
            {' '}
            <Typography color={'red'}>
              Sie haben diese Woche noch kein {translateType()} Item gebucht
            </Typography>{' '}
            <Button
              style={{ marginTop: '1em', marginLeft: '2rem', display: 'flex' }}
              variant="outlined"
              color={'primary'}
              startIcon={<AddIcon />}
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
