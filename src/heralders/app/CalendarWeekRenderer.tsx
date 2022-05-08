import * as React from 'react';
import {endOfWeek, startOfWeek} from "date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import {customDay} from "./WeekPicker";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface CalenderWeekRendererProps {
  setMethode: (methode: string) => void
  setStartWeek: (start: string) => void
  setEndWeek: (end: string) => void

}

export function CalenderWeekRenderer({
                                       setMethode,
                                       setStartWeek,
                                       setEndWeek
                                     }: CalenderWeekRendererProps) {

  const [valueDate, setValueDate] = React.useState<Date | null>(new Date());
  const onChangeDateHandling = (valueDate: Date | null) => {
    if (valueDate) {
      setValueDate(valueDate);
      setMethode("")
      const startOfW = startOfWeek(valueDate);
      const endOfW = endOfWeek(valueDate);

      setStartWeek(startOfW.toISOString());
      setEndWeek(endOfW.toISOString());
    }
  }


  return (<LocalizationProvider dateAdapter={AdapterDateFns}>
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      label="Week picker"
      value={valueDate}
      onChange={newValue =>
        onChangeDateHandling(newValue)
      }
      renderDay={customDay(valueDate)}
      renderInput={(params) => <TextField {...params} />}
      inputFormat="'Week of' MMM d"
    />
  </LocalizationProvider>)
}
