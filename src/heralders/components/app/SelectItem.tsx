import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

interface SelectItemProps {
  menuItems: string[]
  setDisciplineType: (disciplineType: string) => void
  disciplineType: string
}

export function SelectItem({menuItems, setDisciplineType, disciplineType}: SelectItemProps) {

  const [localDiscipleType, setLocalDisciplineType] = React.useState(disciplineType);

  const handleChange = (event: SelectChangeEvent) => {
    setLocalDisciplineType(event.target.value);
    setDisciplineType(event.target.value)
  };
  return (
    <div>
      <FormControl sx={{m: 1, minWidth: 120}}>
        <InputLabel id="demo-simple-select-helper-label">AKTIV TYPE</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={localDiscipleType}
          label="Discipline"
          onChange={handleChange}
        >
          {menuItems.map(x => <MenuItem value={x.split("|").at(0)}>
            <em>{x.split("|").at(1)}</em>
          </MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
