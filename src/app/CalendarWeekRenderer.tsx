import * as React from 'react';
import {endOfWeek, startOfWeek} from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import {customDay} from './WeekPicker';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface CalenderWeekRendererProps {
  setWeekOfYear: (weekOfYear: number) => void;
}

export function CalenderWeekRenderer(calenderWeekRendererProps: CalenderWeekRendererProps) {
  const [valueDate, setValueDate] = React.useState<Date | null>(new Date());
  const onChangeDateHandling = (valueDate: Date | null) => {
    if (valueDate) {
      setValueDate(valueDate);
      const endOfW = endOfWeek(valueDate);
      const weekOfYear= getWeekNumber(endOfW)
     calenderWeekRendererProps.setWeekOfYear(weekOfYear)

    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={valueDate}
        onChange={(newValue) => onChangeDateHandling(newValue)}
        renderDay={customDay(valueDate)}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
export const getWeekNumber=(currentDate :Date):number=>{

 const startDate:Date = new Date(currentDate.getFullYear(), 0, 1);
  let days = Math.floor((currentDate.getMilliseconds()- startDate.getMilliseconds()) /
    (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
}
