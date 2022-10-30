import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import {Button} from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Meditation} from "../../../../../../models/Meditation";
import {GodGiving, GodGivingType} from "../../../../../../models/GodGiving";
import {Gospel, GospelType} from "../../../../../../models/Gospel";

export interface GospelInputFieldProps {
  gospel?: Gospel;
  gospelType: GospelType;
  handleGospelForm: (gospelForm: Map<string, any>) => void;
  deleteGospelAction: () => void;
}

export function GospelInputField(
  gospelInputFieldProps: GospelInputFieldProps
) {
  const [min, setMin] = useState(gospelInputFieldProps.gospel?.timeInMinute);
  const [total, setTotal] = useState(gospelInputFieldProps.gospel?.total);
  const [amount, setAmount] = useState(gospelInputFieldProps.gospel?.amount);
  const [description, setDescription] = useState(gospelInputFieldProps.gospel?.description);

  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const handleChangedTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(toNumber(event.target.value));
  };
  const handleChangedAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(toNumber(event.target.value));
  };
  const handleChangedDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const meditationSave = () => {
    let meditation: Map<string, any> = new Map<string, any>();
    switch (GospelType) {
      case GospelType.GOSPEL:

    }
    meditation.set('timeInMinute', min);
    meditation.set('total', total);
    meditation.set('amount', amount);
    meditation.set('description', description);
    gospelInputFieldProps.handleGospelForm(meditation);
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
          label={gospelInputFieldProps.gospelType===GodGivingType.THANKS?
            "Anzahl der Danksagung":"Anzahl der Probe"}
          type={'number'}
          value={total}
          onChange={handleChangedTotal}
          disabled={gospelInputFieldProps.gospelType===GodGivingType.MONEY}
          variant="filled"
        ></TextField>

        <TextField
          id="filled-select-currency"
          label="Gebrauchte Minuten"
          type={'number'}
          value={min}
          disabled={gospelInputFieldProps.gospelType===GodGivingType.MONEY}
          onChange={handleChangedMin}
          variant="filled"
        ></TextField>
      </div>
        <div>
          <TextField
            id="filled-select-currency"
            label={gospelInputFieldProps.gospelType===GodGivingType.MONEY?
              "Gabe zu Gott":""}
            type={'number'}
            value={total}
            onChange={handleChangedAmount}
            disabled={gospelInputFieldProps.gospelType!==GodGivingType.MONEY}
            variant="filled"
          ></TextField>
          <TextField
            id="outlined-select-currency-native"
            label="Thema"
            multiline
            value={description}
            onChange={handleChangedDescription}
          ></TextField>
        </div>
      <div style={{ marginLeft: '14em', marginTop: '1em' }}>
          <TextField
            id="filled-select-currency-native"
            label="Das Gabe Item wurde am"
            value={gospelInputFieldProps.gospel===undefined?'':
              new Date(
                gospelInputFieldProps.gospel?.createdAt
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
          onClick={gospelInputFieldProps.deleteGodGivingAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={gospelInputFieldProps.gospel === undefined}
          endIcon={<DeleteIcon />}
        >
          Stille Zeit Item löschen
        </Button>
      </div>
    </Box>
  );
}
