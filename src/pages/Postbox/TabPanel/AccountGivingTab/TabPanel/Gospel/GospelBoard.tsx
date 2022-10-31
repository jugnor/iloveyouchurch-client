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
  UpsertGospelRequest,
  UpsertGospelRequestSchema
} from '../../../../../../models/Gospel';
import { GospelInputField } from './GospelInputField';

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
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [gospelType, setGospelType] = useState<SelectElement>(
    GospelType.GOSPEL
  );
  const [godGospel, setGodGospel] = useState<Gospel>();

  const { data: gospelData } = useSWR<Gospel>(
    `/postboxes/${gospelBoardBoardProps.postboxId}/gospels?` +
      `gospelType=${gospelType}&weekOfYear=${weekOfYear}`
  );
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
    const error = UpsertGospelRequestSchema.validate(upsertGospelRequest).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (godGospel === undefined) {
        setAlert('Das neue Gospel Item konnte leider nicht hinzugefügt werden');
      } else {
        setAlert(
          'Das Gospel Item von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertGospelRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (godGospel === undefined) {
        setAlert('Das neue Gospel Item wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Gospel Item von Kalenderwoche ' +
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
      if (godGospel !== undefined) {
        deleteDiscipline(godGospel?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Gospel Item wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deleteGospelAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (gospelData !== undefined && gospelData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setGodGospel(gospelData);
    }
  }, [mode, gospelData]);
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
              setElement={setGospelType}
              element={gospelType}
              menuItems={gospelBoardBoardProps.menuItems}
            />
          </div>
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
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Gospel Item hinzufügen !!!
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
