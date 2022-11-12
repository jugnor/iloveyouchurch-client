import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import useSWR, { useSWRConfig } from 'swr';
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
  GodGivingType, isGodGivingValidationOk,
  UpsertGodGivingRequest
} from '../../../../../../models/GodGiving';
import { GodGivingInputField } from './GodGivingInputField';

export interface GodGivingBoardBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function GodGivingBoard(godGivingBoardBoardProps: GodGivingBoardBoardProps) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    godGivingBoardBoardProps.postboxId,
    godGivingBoardBoardProps.userId,
    godGivingBoardBoardProps.path
  );
  const { mutate ,cache} = useSWRConfig()

  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [alert, setAlert] = useState('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [mode, setMode] = useState('create');
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [godGivingType, setGodGivingType] = useState<SelectElement>(
    GodGivingType.MONEY
  );

  const {
    data: godGivingData,
    mutate:mutateGodGiving
  } = useSWR<GodGiving>(
    `/postboxes/${godGivingBoardBoardProps.postboxId}/god-givings?` +
      `godGivingType=${godGivingType}&weekOfYear=${weekOfYear}`
  );

  useEffect(() => {
    switch (mode) {
      case 'create':
        if (godGivingData !== undefined) {
          setMode("edit")
        }
        break;


    }
  }, [mode, godGivingData,weekOfYear]);

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
  const handleGodGivingType = (element:SelectElement)=>{
    setMode('create')
    setGodGivingType(element)
  }

  const handleWeekOfYear= (weekOfYear:number)=>{
    setMode('create')
    setWeekOfYear(weekOfYear)
  }
  const handleGodGivingForm = (godGivingForm: Map<string, any>) => {
    const upsertGodGivingRequest = {
      timeInMinute: godGivingForm.get('timeInMinute'),
      amount: godGivingForm.get('amount'),
      total: godGivingForm.get('total'),
      description: godGivingForm.get('description'),
      godGivingType: godGivingType,
      weekOfYear: weekOfYear
    } as UpsertGodGivingRequest;

    const isValidationOk = isGodGivingValidationOk(upsertGodGivingRequest);
    console.log("data",upsertGodGivingRequest)
    console.log("error",isValidationOk
    )
    if (!isValidationOk) {
      setSeverity('error');
      if (godGivingData=== undefined) {
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
        mutateGodGiving(godGivingData, true);
        setSeverity('success');
          setAlert(
            'Das neue ' +
              translateType() +
              ' Item wurde erfolgreich hinzugefügt'
          );
      });
    }

    if (alertMessage !== '') {
      setAlert(alertMessage);
      setMode('create');
      setSeverity('error');
    }
    setOpenAlert(true);
  };
  const handleDeleteClick = (shouldDelete: boolean) => {
    if (shouldDelete) {
      if (godGivingData !== undefined) {
        deleteDiscipline(godGivingData.id).then((r) => {
          mutateGodGiving(undefined,true);
          setMode('create');
          setAlert(
            'Das ' + translateType() + ' Item wurde erfolgreich gelöscht'
          );
          setSeverity('success');
          setOpenDialog(false);
        });
      } else {
        setMode('create');
        setOpenDialog(false);
      }
      if (alertMessage !== '') {
        setAlert(alertMessage);
        setMode('create');
        setSeverity('error');
      }
      setOpenAlert(true);
    }else{
      setMode('edit')
    }
  };
  const deleteGodGivingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  return (
    <Container >
      <Typography
        component="div"
        className={'program'}
        style={{ overflowY: 'auto', display: 'block'  }}
      >
        <div>
          <div
            style={{ display: 'flex' }}
          >
            <FormControl>
              <InputLabel id="demo-simple-select-label">KW</InputLabel>
              <MenuItem style={{ backgroundColor: '#1976d2', color: 'white' }}>
                {weekOfYear}
              </MenuItem>
            </FormControl>
            <CalenderWeekRenderer setWeekOfYear={handleWeekOfYear} />
            <SelectItem
              setElement={handleGodGivingType}
              element={godGivingType}
              menuItems={godGivingBoardBoardProps.menuItems}
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
            </Button>{' '}
          </div>
        )}
        {mode === 'delete' && openDialog &&(
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
