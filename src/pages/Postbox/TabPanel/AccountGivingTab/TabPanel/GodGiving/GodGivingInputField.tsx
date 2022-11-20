import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { Button } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GodGiving, GodGivingType } from '../../../../../../models/GodGiving';

export interface GodGivingInputFieldProps {
  godGiving?: GodGiving;
  godGivingType: GodGivingType;
  handleGodGivingForm: (godGivingForm: Map<string, any>) => void;
  deleteGodGivingAction: () => void;
}

export function GodGivingInputField(
  godGivingInputFieldProps: GodGivingInputFieldProps
) {
  const [min, setMin] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    if (godGivingInputFieldProps.godGiving !== undefined) {
      setTotal(godGivingInputFieldProps.godGiving.total);
      setMin(godGivingInputFieldProps.godGiving.timeInMinute);
      setAmount(godGivingInputFieldProps.godGiving.amount);
      setDescription(godGivingInputFieldProps.godGiving.description);
    } else {
      setTotal(undefined);
      setMin(undefined);
      setAmount(undefined);
      setDescription(undefined);
    }
  }, [godGivingInputFieldProps.godGiving]);
  const translateType = () => {
    switch (godGivingInputFieldProps.godGivingType) {
      case GodGivingType.MONEY:
        return 'Spende';
      case GodGivingType.THANKS:
        return 'Danksagung';
      case GodGivingType.CHORE:
        return 'Probe';
    }
  };
  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const handleChangedTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(toNumber(event.target.value));
  };
  const handleChangedAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(toNumber(event.target.value));
  };
  const handleChangedDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const godGivingSave = () => {
    let godGiving: Map<string, any> = new Map<string, any>();
    godGiving.set('timeInMinute', min);
    godGiving.set('total', total);
    godGiving.set('amount', amount);
    godGiving.set('description', description);
    godGivingInputFieldProps.handleGodGivingForm(godGiving);
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100ch' }
      }}
      noValidate
      autoComplete="off"
      overflow="scroll"
    >
      <div style={{ display: 'flex' }}>
        {godGivingInputFieldProps.godGivingType !== GodGivingType.MONEY && (
          <TextField
            id="filled-select-currency"
            label={
              godGivingInputFieldProps.godGivingType === GodGivingType.THANKS
                ? 'Anzahl der Danksagung'
                : 'Anzahl der Probe'
            }
            type={'number'}
            value={
              godGivingInputFieldProps.godGiving !== undefined
                ? total
                : undefined
            }
            onChange={handleChangedTotal}
            required={true}
            variant="filled"
          ></TextField>
        )}
        {godGivingInputFieldProps.godGivingType !== GodGivingType.MONEY && (
          <TextField
            id="filled-select-currency"
            label="Gebrauchte Minuten"
            type={'number'}
            value={
              godGivingInputFieldProps.godGiving !== undefined ? min : undefined
            }
            onChange={handleChangedMin}
            variant="filled"
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {godGivingInputFieldProps.godGivingType === GodGivingType.MONEY && (
          <TextField
            id="filled-select-currency"
            label={'Betrag'}
            type={'number'}
            value={
              godGivingInputFieldProps.godGiving !== undefined
                ? amount
                : undefined
            }
            onChange={handleChangedAmount}
            variant="filled"
            required={true}
          ></TextField>
        )}
        <TextField
          id="outlined-select-currency-native"
          label="Beschreibung"
          multiline
          value={
            godGivingInputFieldProps.godGiving !== undefined
              ? description
              : undefined
          }
          required={
            godGivingInputFieldProps.godGivingType !== GodGivingType.CHORE
          }
          onChange={handleChangedDescription}
        ></TextField>
      </div>
      {godGivingInputFieldProps.godGiving !== undefined && (
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="filled-select-currency-native"
            label=""
            value={
              godGivingInputFieldProps.godGiving === undefined
                ? 'Es Liegt Momentan kein Datum vor'
                : 'Das Gabe Item wurde am ' +
                  new Date(
                    godGivingInputFieldProps.godGiving?.createdAt
                  ).toLocaleString() +
                  ' erstellt'
            }
            disabled={true}
            variant="filled"
          ></TextField>
        </div>
      )}

      <div style={{ marginTop: '2em', display: 'flex' }}>
        <Button
          onClick={() => godGivingSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={godGivingInputFieldProps.deleteGodGivingAction}
          style={{ marginLeft: '28rem' }}
          color="secondary"
          variant="outlined"
          disabled={godGivingInputFieldProps.godGiving === undefined}
          endIcon={<DeleteIcon />}
        >
          {translateType()} Item löschen
        </Button>
      </div>
    </Box>
  );
}
