import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {Fasting} from "./Fasting";



export interface FastingInputFieldProps {
  fasting:Fasting|undefined
  handleFastingForm :(element : string,value:any) => void;

}

 export function FastingInputField(fastingInputFieldProps:FastingInputFieldProps) {

   const [goalValue, setGoalValue] = React.useState(fastingInputFieldProps.fasting?fastingInputFieldProps.fasting.goal:undefined);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     fastingInputFieldProps.handleFastingForm("goal",event.target.value);
     setGoalValue(event.target.value)
   };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>

        <TextField
          id="outlined-select-currency-native"
          label="Ziele"
          multiline
          value={goalValue}
          onChange={handleChange}
        >
        </TextField>
      </div>
      {fastingInputFieldProps.fasting?(
        <div>
          <TextField
            id="filled-select-currency"
            label="Kalenderwoche"
            type="number"
            value={fastingInputFieldProps.fasting.weekOfYear}
            disabled={true}
            helperText="Please select your currency"
            variant="filled"
          >
          </TextField>
          <TextField
            id="filled-select-currency-native"
            label="Native select"
            value={fastingInputFieldProps.fasting.createdAt}
            disabled={true}
            helperText="Please select your currency"
            variant="filled"
          >
          </TextField>
        </div>
      ):''}
    </Box>
  );
}
