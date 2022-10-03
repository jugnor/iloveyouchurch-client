import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ActivityType } from '../models/ActivityType';
import { translateActivityType } from '../models/Activity';

interface SelectItemProps {
  setActivityType: (disciplineType: string) => void;
  activityType: string;
}

export function SelectItem({ setActivityType, activityType }: SelectItemProps) {
  const [localDiscipleType, setLocalDisciplineType] =
    React.useState(activityType);
  const menuItems = Array.of(
    ActivityType.NEWS,
    ActivityType.PENALTY,
    ActivityType.EVENT,
    ActivityType.ANNOUNCEMENT,
    ActivityType.PROGRAM
  );
  const handleChange = (event: SelectChangeEvent) => {
    setLocalDisciplineType(event.target.value);
    setActivityType(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Auswahl</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={localDiscipleType}
          label="Discipline"
          onChange={handleChange}
        >
          {menuItems.map((item) => (
            <MenuItem value={item}>
              <em>{translateActivityType(item)}</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
