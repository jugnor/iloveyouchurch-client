import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Fasting } from '../../../../../../models/Fasting/Fasting';
import { useState } from 'react';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { Button } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

export interface FastingInputFieldProps {
  fasting?: Fasting;
  handleFastingForm: (fastingForm: Map<string, any>) => void;
  deleteFastingAction: () => void;
}

export function FastingInputField(
  fastingInputFieldProps: FastingInputFieldProps
) {
  const [goal, setGoal] = useState(fastingInputFieldProps.fasting?.goal);
  const [days, setDays] = useState(fastingInputFieldProps.fasting?.days);

  const handleChangedGoal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };
  const fastingSave = () => {
    let fastingFormMap: Map<string, any> = new Map<string, any>();
    fastingFormMap.set('goal', goal);
    fastingFormMap.set('days', days);
    fastingInputFieldProps.handleFastingForm(fastingFormMap);
  };
  const handleChangedDays = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDays(toNumber(event.target.value));
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' }
      }}
      noValidate
      autoComplete="off"
      marginX="15em"
    >
      <div>
        <TextField
          id="outlined-select-currency-native"
          label="Ziele"
          multiline
          value={goal}
          onChange={handleChangedGoal}
        ></TextField>
        <TextField
          id="filled-select-currency"
          label="Tage des Fastens"
          type={'number'}
          value={days}
          onChange={handleChangedDays}
          variant="filled"
        ></TextField>
      </div>

      <div style={{ marginLeft: '14em', marginTop: '1em' }}>
        <TextField
          id="filled-select-currency-native"
          label="Das Fasting Item wurde am"
          value={
            new Date(
              fastingInputFieldProps.fasting === undefined
                ? ''
                : fastingInputFieldProps.fasting?.createdAt
            ).toLocaleString() + ' erstellt'
          }
          disabled={true}
          variant="filled"
        ></TextField>
      </div>

      <div style={{ marginLeft: '7em', marginTop: '2em' }}>
        <Button
          onClick={() => fastingSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={fastingInputFieldProps.deleteFastingAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={fastingInputFieldProps.fasting === undefined}
          endIcon={<DeleteIcon />}
        >
          Fasting Item löschen
        </Button>
      </div>
    </Box>
  );
}
