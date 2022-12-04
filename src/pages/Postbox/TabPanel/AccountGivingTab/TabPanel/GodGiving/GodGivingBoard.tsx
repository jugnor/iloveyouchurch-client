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
  GodGivingType,
  UpsertGodGivingRequest
} from '../../../../../../models/GodGiving';
import { useTranslation } from 'react-i18next';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { GodGivingInputForm } from './GodGivingInputForm';

export interface GodGivingBoardBoardProps {
  postboxId: string;
  menuItems: string[];
  path: string;
  userId: string;
}

export function GodGivingBoard(
  godGivingBoardBoardProps: GodGivingBoardBoardProps
) {
  const { alertMessage, createDiscipline, deleteDiscipline } = useDiscipline(
    godGivingBoardBoardProps.postboxId,
    godGivingBoardBoardProps.userId,
    godGivingBoardBoardProps.path
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
  const [godGivingType, setGodGivingType] = useState<SelectElement>(
    GodGivingType.MONEY
  );
  const { translateType } = useDisciplineType(godGivingType as GodGivingType);

  const {
    data: godGivingData,
    mutate: mutateGodGiving,
    isValidating: isValidatingGodGiving
  } = useSWR<GodGiving>(
    `/postboxes/${godGivingBoardBoardProps.postboxId}/god-givings?` +
      `godGivingType=${godGivingType}&weekOfYear=${weekOfYear}`
  );

  useEffect(() => {
    switch (mode) {
      case 'create':
        if (godGivingData !== undefined) {
          setMode('edit');
        }
        break;
    }
  }, [mode, godGivingData, weekOfYear]);

  const handleGodGivingType = (element: SelectElement) => {
    setMode('create');
    setGodGivingType(element);
  };

  const handleWeekOfYear = (weekOfYear: number) => {
    setMode('create');
    setWeekOfYear(weekOfYear);
  };
  const handleGodGivingForm = useCallback(
    async (data: UpsertGodGivingRequest) => {
      await createDiscipline(data).then((r) => {
        mutateGodGiving(godGivingData, true);
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
      if (godGivingData !== undefined) {
        deleteDiscipline(godGivingData?.id).then((r) => {
          mutateGodGiving(undefined, true);
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
  const deleteGodGivingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  return (
    <Container>
      <Typography
        component="div"
        className={'program'}
        style={{ overflowY: 'auto', display: 'block' ,backgroundColor: '#F0F8FF'}}
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
              setElement={handleGodGivingType}
              element={godGivingType}
              menuItems={godGivingBoardBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <GodGivingInputForm
              deleteGodGivingAction={deleteGodGivingAction}
              godGivingType={godGivingType as GodGivingType}
              godGiving={godGivingData}
              weekOfYear={weekOfYear}
              onSubmit={handleGodGivingForm}
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
