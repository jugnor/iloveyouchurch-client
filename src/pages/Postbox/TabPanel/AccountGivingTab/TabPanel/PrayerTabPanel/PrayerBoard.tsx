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
  Prayer,
  PrayerType,
  UpsertPrayerRequest,
  UpsertPrayerRequestSchema
} from "../../../../../../models/Prayer";
import {PrayerInputField} from "./PrayerInputField";

export interface PrayerBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function PrayerBoard(prayerBoardProps: PrayerBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    prayerBoardProps.postboxId,
    prayerBoardProps.userId,
    prayerBoardProps.path
  );
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [prayerType, setPrayerType] = useState<SelectElement>(
    PrayerType.ALONE
  );
  const [prayer, setPrayer] = useState<Prayer>();

  const { data: prayerData } = useSWR<Prayer>(
    `/postboxes/${prayerBoardProps.postboxId}/prayers?` +
      `prayerType=${prayerType}&weekOfYear=${weekOfYear}`
  );
  const handlePrayerForm = (prayerForm: Map<string, any>) => {
    const upsertPrayerRequest = {
      timeInMinute: prayerForm.get('timeInMinute'),
      theme: prayerForm.get('theme'),
      prayerNight:prayerType===PrayerType.GROUP?prayerForm.get("prayerNight"):undefined,
      prayerType: prayerType,
      weekOfYear: weekOfYear
    } as UpsertPrayerRequest;

    const error =
      UpsertPrayerRequestSchema.validate(upsertPrayerRequest ).error;
    if (error) {
      setMode('create');
      setSeverity('error');
      if (prayer === undefined) {
        setAlert(
          'Das neue Prayer Item konnte leider nicht hinzugefügt werden'
        );
      } else {
        setAlert(
          'Das Prayer Item von Kalenderwoche ' +
            weekOfYear +
            ' konnte leider nicht geändert werden'
        );
      }
    }
    createDiscipline(upsertPrayerRequest).then((r) => {
      setMode('edit');
      setSeverity('success');
      if (prayer === undefined) {
        setAlert('Das neue Prayer Item wurde erfolgreich hinzugefügt');
      } else {
        setAlert(
          'Das Prayer Item von Kalenderwoche ' +
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
      if (prayer !== undefined) {
        deleteDiscipline(prayer?.id).then((r) => {
          setMode('edit');
          setOpenAlert(true);
          setAlert('Das Prayer Item wurde erfolgreich gelöscht');
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('edit');
        setOpenDialog(false);
      }
    }
  };
  const deletePrayerAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (prayerData !== undefined && prayerData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
      setPrayer(prayerData);
    }
  }, [mode, prayerData]);
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
              setElement={setPrayerType}
              element={prayerType}
              menuItems={prayerBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <PrayerInputField
              deletePrayerAction ={deletePrayerAction}
              prayerType={prayerType as PrayerType}
              prayer={prayerData}
              handlePrayerForm={handlePrayerForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Item Prayer hinzufügen !!!
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
