import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface SelectItemProps {
  setElement: (element: string) => void;
  element: string;
  menuItems:string[]
}

export function SelectItem({ setElement, element,menuItems }: SelectItemProps) {
  const [localDiscipleType, setLocalDisciplineType] =
    React.useState(element);

  const handleChange = (event: SelectChangeEvent) => {
    setLocalDisciplineType(event.target.value);
    setElement(event.target.value);
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
            <MenuItem value={item.split("|")[0]}>
              <em>{item.split("|")[1]}</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
