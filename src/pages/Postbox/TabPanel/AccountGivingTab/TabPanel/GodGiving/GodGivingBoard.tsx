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
import AddIcon from '@mui/icons-material/Add';

import {
  GodGiving,
  GodGivingType,
  UpsertGodGivingRequest,
  UpsertGodGivingRequestSchema
} from '../../../../../../models/GodGiving';
import { GodGivingInputField } from './GodGivingInputField';

export interface GodGivingBoardBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function GodGivingBoard(godgivingBoardProps: GodGivingBoardBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    godgivingBoardProps.postboxId,
    godgivingBoardProps.userId,
    godgivingBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [godGivingType, setGodGivingType] = useState<SelectElement>(
    GodGivingType.MONEY
  );

  const [godGiving, setGodGiving] = useState<GodGiving>();
  const {
    data: godGivingData,
    error,
    isValidating,
    mutate
  } = useSWR<GodGiving>(
    `/postboxes/${godgivingBoardProps.postboxId}/god-givings?` +
      `godGivingType=${godGivingType}&weekOfYear=${weekOfYear}`
  );

  useEffect(() => {
    if (!isValidating) {
        setMode('edit');
    }else{
      if(mode===''){
        setMode('create')
      }else
      if(mode==='create'){
      setMode('edit')
    }}

    setGodGiving(godGivingData);
  }, [mode, godGivingData,isValidating]);

  const translateType = () => {
    switch (godGivingType) {
      case GodGivingType.MONEY:
        return 'Spende';
      case GodGivingType.THANKS:
        return 'Danksagung';
      case GodGivingType.CHORE:
        return 'Probe';
    }
  };
  const handleGodGivingForm = (godGivingForm: Map<string, any>) => {
    const upsertGodGivingRequest = {
      timeInMinute: godGivingForm.get('timeInMinute'),
      amount: godGivingForm.get('amount'),
      total: godGivingForm.get('total'),
      description: godGivingForm.get('description'),
      godGivingType: godGivingType,
      weekOfYear: weekOfYear
    } as UpsertGodGivingRequest;

    const error = UpsertGodGivingRequestSchema.validate(
      upsertGodGivingRequest
    ).error;
    if (error) {
      setSeverity('error');
      if (godGiving === undefined) {
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
      createDiscipline(upsertGodGivingRequest).then((r) => {
        setMode('edit');
        setSeverity('success');
        if (godGiving === undefined) {
          setAlert(
            'Das neue ' +
              translateType() +
              ' Item wurde erfolgreich hinzugefügt'
          );
        } else {
          setAlert(
            'Das ' +
              translateType() +
              ' Item von Kalenderwoche ' +
              weekOfYear +
              ' wurde erfolgreich geändert'
          );
        }
      });
    }

    if (alertMessage !== '') {
      setAlert(alertMessage);
      setMode('');
      setSeverity('error');
    }
    setOpenAlert(true);
  };
  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      if (godGiving !== undefined) {
        deleteDiscipline(godGiving?.id).then((r) => {
          setMode('edit');
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
        setMode('');
        setSeverity('error');
      }
      setOpenAlert(true);
    }
  };
  const deleteGodGivingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
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
            {console.log('Type', godGivingData)}
            <CalenderWeekRenderer setWeekOfYear={setWeekOfYear} />
            <SelectItem
              setElement={setGodGivingType}
              element={godGivingType}
              menuItems={godgivingBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <GodGivingInputField
              deleteGodGivingAction={deleteGodGivingAction}
              godGivingType={godGivingType as GodGivingType}
              godGiving={godGiving}
              handleGodGivingForm={handleGodGivingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <div style={{ marginLeft: '27rem' }}>
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
            </Button>{' '}
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
