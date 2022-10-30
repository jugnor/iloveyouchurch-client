import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import {Button} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Meditation} from "../../../../../../models/Meditation";

export interface MeditationInputFieldProps {
  meditation?: Meditation;
  handleMeditationForm: (prayerForm: Map<string, any>) => void;
  deleteMeditationAction: () => void;
}

export function MeditationInputField(
  meditationInputFieldProps: MeditationInputFieldProps
) {
  const [min, setMin] = useState(meditationInputFieldProps.meditation?.timeInMinute);
  const [total, setTotal] = useState(meditationInputFieldProps.meditation?.total);
  const [theme, setTheme] = useState(meditationInputFieldProps.meditation?.theme);
  const [verse, setVerse] = useState(meditationInputFieldProps.meditation?.verse);

  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const handleChangedTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(toNumber(event.target.value));
  };
  const meditationSave = () => {
    let meditation: Map<string, any> = new Map<string, any>();
    meditation.set('timeInMinute', min);
    meditation.set('total', total);
    meditation.set('theme', theme);
    meditation.set('verse', verse);
    meditationInputFieldProps.handleMeditationForm(meditation);
  };
  const handleChangedVerse= (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerse(event.target.value);
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
          id="filled-select-currency"
          label="Anzahl stiller zeite"
          type={'number'}
          value={total}
          onChange={handleChangedTotal}
          variant="filled"
        ></TextField>

        <TextField
          id="filled-select-currency"
          label="Gebrauchte Minuten"
          type={'number'}
          value={min}
          onChange={handleChangedMin}
          variant="filled"
        ></TextField>
      </div>
        <div>
          <TextField
            id="outlined-select-currency-native"
            label="Thema"
            multiline
            value={theme}
            onChange={handleChangedTheme}
          ></TextField>
          <TextField
            id="outlined-select-currency-native"
            label="Verse"
            multiline
            value={theme}
            onChange={handleChangedVerse}
          ></TextField>
        </div>
      <div style={{ marginLeft: '14em', marginTop: '1em' }}>
          <TextField
            id="filled-select-currency-native"
            label="Die stille Zeit Item wurde am"
            value={meditationInputFieldProps.meditation===undefined?'':
              new Date(
                meditationInputFieldProps.meditation?.createdAt
              ).toLocaleString() + ' erstellt'
            }
            disabled={true}
            variant="filled"
          ></TextField>
        </div>

      <div style={{ marginLeft: '7em', marginTop: '2em' }}>
        <Button
          onClick={() => meditationSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={meditationInputFieldProps.deleteMeditationAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={meditationInputFieldProps.meditation === undefined}
          endIcon={<DeleteIcon />}
        >
          Stille Zeit Item löschen
        </Button>
      </div>
    </Box>
  );
}
