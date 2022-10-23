import * as React from 'react';
import { Fasting, FastingType } from '../../../../../../models/Fasting/Fasting';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@material-ui/core/Container';
import { FastingInputField } from '../../../../../../models/Fasting/FastingInputField';
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

export interface FastingBoardProps {
  postboxId: string;
  menuItems: string[];
}

export function FastingBoard(fastingBoardProps: FastingBoardProps) {
  const date = new Date(now());

  const woy: number = getWeekNumber(startOfISOWeek(date));

  const [mode, setMode] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [fastingType, setFastingType] = useState<SelectElement>(
    FastingType.PARTIAL
  );

  const { data: fastingData } = useSWR<Fasting>(
    `/postboxes/${fastingBoardProps.postboxId}/fastings?` +
      `fastingType=${fastingType}&weekOfYear=${weekOfYear}`
  );
  const handleFastingForm = (fastingForm: Map<string, any>) => {
    // Todo
  };
  const handleDeleteClick = () => {
    // Todo
  };
  const deleteFastingAction = () => {
    setMode('delete');
    setOpenDialog(true);
  };
  useEffect(() => {
    if (mode === '') {
      if (fastingData !== undefined && fastingData !== null) {
        setMode('edit');
      } else {
        setMode('create');
      }
    }
  }, [mode, fastingData]);
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
              setElement={setFastingType}
              element={fastingType}
              menuItems={fastingBoardProps.menuItems}
            />
          </div>
        </div>
        {mode === 'edit' && (
          <div>
            <FastingInputField
              deleteFastingAction={deleteFastingAction}
              fasting={fastingData}
              handleFastingForm={handleFastingForm}
            />
          </div>
        )}
        {mode === 'create' && (
          <Button variant="outlined" onClick={() => setMode('edit')}>
            Neues Fasting Item hinzufügen !!!
          </Button>
        )}
        {mode === 'delete' && openDialog && (
          <DeleteDialog
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </Typography>
    </Container>
  );
}
