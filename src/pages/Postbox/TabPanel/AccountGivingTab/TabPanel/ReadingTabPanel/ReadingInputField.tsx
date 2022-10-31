import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { Button } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Reading, ReadingType } from '../../../../../../models/Reading';

export interface ReadingInputFieldProps {
  reading?: Reading;
  readingType: ReadingType;
  handleReadingForm: (readingForm: Map<string, any>) => void;
  deleteReadingAction: () => void;
}

export function ReadingInputField(
  readingInputFieldProps: ReadingInputFieldProps
) {
  const [min, setMin] = useState(readingInputFieldProps.reading?.timeInMinute);
  const [totalCap, setTotalCap] = useState(
    readingInputFieldProps.reading?.totalCap
  );
  const [theme, setTheme] = useState(readingInputFieldProps.reading?.theme);
  const [referenceEnd, setReferenceEnd] = useState(
    readingInputFieldProps.reading?.referenceEnd
  );
  const [title, setTitle] = useState(readingInputFieldProps.reading?.title);
  const [theEnd, setTheEnd] = useState(readingInputFieldProps.reading?.theEnd);

  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const handleChangedTotalCap = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotalCap(toNumber(event.target.value));
  };
  const handleChangedTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.value);
  };
  const handleChangedReferenceEnd = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReferenceEnd(event.target.value);
  };
  const handleChangedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangedTheEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheEnd(event.target.value === 'true');
  };
  const readingSave = () => {
    let readingFormMap: Map<string, any> = new Map<string, any>();
    readingFormMap.set('timeInMinute', min);
    readingFormMap.set('totalCap', totalCap);
    readingFormMap.set('theme', theme);
    readingFormMap.set('referenceEnd', referenceEnd);
    readingFormMap.set('title', title);
    readingFormMap.set('theEnd', theEnd);
    readingInputFieldProps.handleReadingForm(readingFormMap);
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
          label="Totale gelesene Kapiteln"
          type={'number'}
          value={min}
          onChange={handleChangedTotalCap}
          variant="filled"
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
          id="outlined-select-currency-native"
          label="Thema"
          multiline
          value={theme}
          onChange={handleChangedTheme}
        ></TextField>
        <TextField
          id="outlined-select-currency-native"
          label="Referenz"
          multiline
          value={referenceEnd}
          onChange={handleChangedReferenceEnd}
        ></TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-currency-native"
          label="Titel"
          disabled={readingInputFieldProps.readingType !== ReadingType.C_BOOK}
          multiline
          value={title}
          onChange={handleChangedTitle}
        ></TextField>
        <TextField
          id="outlined-select-currency-native"
          label="Ende ?"
          multiline
          value={theEnd}
          onChange={handleChangedTheEnd}
        ></TextField>
      </div>
      <div style={{ marginLeft: '14em', marginTop: '1em' }}>
        <TextField
          id="filled-select-currency-native"
          label="Das Prayer Item wurde am"
          value={
            readingInputFieldProps.reading === undefined
              ? ''
              : new Date(
                  readingInputFieldProps.reading?.createdAt
                ).toLocaleString() + ' erstellt'
          }
          disabled={true}
          variant="filled"
        ></TextField>
        )
      </div>

      <div style={{ marginLeft: '7em', marginTop: '2em' }}>
        <Button
          onClick={() => readingSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={readingInputFieldProps.deleteReadingAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={readingInputFieldProps.reading === undefined}
          endIcon={<DeleteIcon />}
        >
          Prayer Item löschen
        </Button>
      </div>
    </Box>
  );
}
