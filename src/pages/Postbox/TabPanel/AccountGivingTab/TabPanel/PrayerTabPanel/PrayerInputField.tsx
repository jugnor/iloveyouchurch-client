import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import {Button} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Prayer, PrayerType} from "../../../../../../models/Prayer";

export interface PrayerInputFieldProps {
  prayer?: Prayer;
  prayerType:PrayerType;
  handlePrayerForm: (prayerForm: Map<string, any>) => void;
  deletePrayerAction: () => void;
}

export function PrayerInputField(
  prayerInputFieldProps: PrayerInputFieldProps
) {
  const [min, setMin] = useState(prayerInputFieldProps.prayer?.timeInMinute);
  const [pNight, setPNight] = useState(prayerInputFieldProps.prayer?.prayerNight);
  const [theme, setTheme] = useState(prayerInputFieldProps.prayer?.theme);

  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const prayerSave = () => {
    let prayerFormMap: Map<string, any> = new Map<string, any>();
    prayerFormMap.set('timeInMinute', min);
    prayerFormMap.set('prayerNight', pNight);
    prayerFormMap.set('theme', theme);
    prayerInputFieldProps.handlePrayerForm(prayerFormMap);
  };
  const handleChangedPNight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPNight(toNumber(event.target.value));
  };
  const handleChangedTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
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
          label="Thema"
          multiline
          value={theme}
          onChange={handleChangedTheme}
        ></TextField>
        <TextField
          id="filled-select-currency"
          label="Gebrauchte Zeit"
          type={'number'}
          value={min}
          onChange={handleChangedMin}
          variant="filled"
        ></TextField>
      </div>
        <div>
          <TextField
            id="filled-select-currency"
            label="Anzahl Gebtsnächte"
            type={'number'}
            value={pNight}
            onChange={handleChangedPNight}
            disabled={prayerInputFieldProps.prayerType===PrayerType.ALONE}
            variant="filled"
          ></TextField>
           (
          <TextField
            id="filled-select-currency-native"
            label="Das Prayer Item wurde am"
            value={prayerInputFieldProps.prayer===undefined?'':
              new Date(
                prayerInputFieldProps.prayer?.createdAt
              ).toLocaleString() + ' erstellt'
            }
            disabled={true}
            variant="filled"
          ></TextField>
      )
        </div>

      <div style={{ marginLeft: '7em', marginTop: '2em' }}>
        <Button
          onClick={() => prayerSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={prayerInputFieldProps.deletePrayerAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={prayerInputFieldProps.prayer === undefined}
          endIcon={<DeleteIcon />}
        >
          Prayer Item löschen
        </Button>
      </div>
    </Box>
  );
}
