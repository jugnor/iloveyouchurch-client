import * as React from "react";
import {Fasting, FastingType} from "../../../../../../models/Fasting/Fasting";
import {useState} from "react";
import toNumber from "@mui/x-data-grid/lib/lodash/toNumber";
import Typography from "@mui/material/Typography";
import Container from "@material-ui/core/Container";
import {FastingInputField} from "../../../../../../models/Fasting/FastingInputField";
import useSWR from "swr";
import {CalenderWeekRenderer, getWeekNumber} from "../../../../../../app/CalendarWeekRenderer";
import {endOfISOWeek} from "date-fns";
import {SelectItem} from "../../../../../../app/SelectItem";
import { Divider, FormControl } from "@material-ui/core";
import Button from "@mui/material/Button";
import {FormControlLabel, Radio, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";


export interface FastingBoardProps {
postboxId:string
  menuItems:string []
}

export function FastingBoard(fastingBoardProps:FastingBoardProps) {

  const date = new Date();
  const woy:number =getWeekNumber(endOfISOWeek(date))
  const [goal, setGoal] = useState<string>();
  const [days, setDays] = useState<number>();

  const [weekOfYear, setWeekOfYear] = React.useState<number>(woy);
  const [fastingType, setFastingType] = useState<string>(
    FastingType.PARTIAL
  );

  const handleFastingForm = (element:string,value:any )=> {
    switch (element) {
      case "goal":setGoal(value)
        break;
      case "days": setDays(toNumber(value))
        break;
    }
  };

  const { data:fastingData } = useSWR<Fasting>(
    `/postboxes/${fastingBoardProps.postboxId}/fasting?` +
    `&fastingType=${fastingType}&weekOfYear=${weekOfYear}`
  );

  return (<Container>
    <Typography
      component="div"
      className={'program'}
      style={{ overflowY: 'auto' }}
    >
      <div style={{ display: "flex" }}>
      <div style={{ marginLeft: 400, display: "flex", flexDirection: "row" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">KW</InputLabel>
            <MenuItem style={{backgroundColor:"#1976d2",color:"white"}}>52</MenuItem>
        </FormControl>

        <CalenderWeekRenderer
          setWeekOfYear={setWeekOfYear}
        />
        <SelectItem
          setElement={setFastingType}
          element={fastingType}
          menuItems={fastingBoardProps.menuItems}
        />
      </div>
      </div>
      <Divider/>
      <div>
        <FastingInputField fasting={fastingData} handleFastingForm={handleFastingForm}/>
      </div>

      </Typography>
      </Container>)
}
