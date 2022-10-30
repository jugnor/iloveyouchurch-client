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
  GodGiving,
  GodGivingType,
  UpsertGodGivingRequest,
  UpsertGodGivingRequestSchema
} from "../../../../../../models/GodGiving";
import {GodGivingInputField} from "./GodGivingInputField";

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

  const { data: godGivingData } = useSWR<GodGiving>(
    `/postboxes/${godgivingBoardProps.postboxId}/godGivings?` +
      `godGivingType=${godGivingType}&weekOfYear=${weekOfYear}`
  );
  const handleGodGivingForm = (godGivingForm: Map<string, any>) => {
    const upsertGodGivingRequest = {
      timeInMinute: godGivingForm.get('timeInMinute'),
      amount: godGivingForm.get('amount'),
      total: godGivingForm.get('total'),
      description: godGivingForm.get('description'),
      godGivingType: godGivingType,
      weekOfYear: weekOfYear
    } as UpsertGodGivingRequest;

    const error =
      UpsertGodGivingRequestSchema.validate(upsertGodGivingRequest ).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (godGiving === undefined) {
        setAlert(
          'Das neue Item GodGiving konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das Item GodGiving von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertGodGivingRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (godGiving === undefined) {
        setAlert('Das neue Item GodGiving wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Item GodGiving von Kalenderwoche ' +
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
      if (godGiving !== undefined) {
        deleteDiscipline(godGiving?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Item GodGiving wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deleteGodGivingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (godGivingData !== undefined && godGivingData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setGodGiving(godGivingData);
    }
  }, [mode, godGivingData]);
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
              godGiving={godGivingData}
              handleGodGivingForm={handleGodGivingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Item GodGiving hinzufügen !!!
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
