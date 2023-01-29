import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useSWR from 'swr';
import { GroupModel } from '../models/GroupModel';
import { useRoleType } from '../hooks/useRoleType';

interface SelectItemProps {
  setElement: (element: string) => void;
  element: string;
  groupName: string;
}

export function GroupSelect({
  setElement,
  element,
  groupName
}: SelectItemProps) {
  const { data: groups, mutate: groupsMutate } = useSWR<GroupModel[]>(
    `/api/groups/${groupName}/subGroups`
  );
  const [localElement, setLocalElement] = React.useState(element);
  const { translateRoleType } = useRoleType();

  const handleChange = (event: SelectChangeEvent) => {
    setLocalElement(event.target.value);
    setElement(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">
          Auswahl
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={localElement}
          label="Rolle"
          onChange={handleChange}
        >
          <MenuItem value={'all'}>
            <em>{translateRoleType('all')}</em>
          </MenuItem>
          {groups?.map((item) => (
            <MenuItem value={item.subGroupId}>
              <em>{translateRoleType(item.groupRole)}</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
