import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import toNumber from '@mui/x-data-grid/lib/lodash/toNumber';
import { Button } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Gospel, GospelType } from '../../../../../../models/Gospel';

export interface GospelInputFieldProps {
  gospel?: Gospel;
  gospelType: GospelType;
  handleGospelForm: (gospelForm: Map<string, any>) => void;
  deleteGospelAction: () => void;
}

export function GospelInputField(gospelInputFieldProps: GospelInputFieldProps) {
  const [min, setMin] = useState(gospelInputFieldProps.gospel?.timeInMinute);
  const [total, setTotal] = useState(gospelInputFieldProps.gospel?.total);
  const [name, setName] = useState(
    gospelInputFieldProps.gospel?.gospelContact?.name
  );
  const [email, setEmail] = useState(
    gospelInputFieldProps.gospel?.gospelContact?.email
  );

  const [goal, setGoal] = useState(gospelInputFieldProps.gospel?.goal);
  const [title, setTitle] = useState(
    gospelInputFieldProps.gospel?.gospelSupport?.title
  );
  const [telephone, setTelephone] = useState(
    gospelInputFieldProps.gospel?.gospelContact?.telephone
  );
  const [city, setCity] = useState(
    gospelInputFieldProps.gospel?.gospelContact?.city
  );
  const [supportType, setSupportType] = useState(
    gospelInputFieldProps.gospel?.gospelSupport?.supportType
  );

  const handleChangedMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(toNumber(event.target.value));
  };
  const handleChangedTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotal(toNumber(event.target.value));
  };
  const handleChangedGoal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };
  const handleChangedName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleChangedEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleChangedTelephone = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTelephone(event.target.value);
  };
  const handleChangedCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const handleChangedSupportType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupportType(event.target.value);
  };
  const meditationSave = () => {
    let gospelMap: Map<string, any> = new Map<string, any>();
    switch (gospelInputFieldProps.gospelType) {
      case GospelType.GOSPEL:
        gospelMap.set('timeInMinute', min);
        gospelMap.set('total', total);
        gospelMap.set('goal', goal);
        break;

      case GospelType.SUPPORT:
        gospelMap.set('total', total);
        gospelMap.set('title', title);
        gospelMap.set('supportType', supportType);

        break;
      case GospelType.CONTACT:
        gospelMap.set('name', name);
        gospelMap.set('email', email);
        gospelMap.set('telephone', telephone);
        gospelMap.set('city', city);
        break;
    }
    gospelInputFieldProps.handleGospelForm(gospelMap);
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
        {gospelInputFieldProps.gospelType === GospelType.GOSPEL && (
          <TextField
            id="outlined-select-currency-native"
            label="Ziele"
            multiline
            value={gospelInputFieldProps.gospel?.goal}
            onChange={handleChangedGoal}
          ></TextField>
        )}
        {gospelInputFieldProps.gospelType === GospelType.GOSPEL && (
          <TextField
            id="filled-select-currency"
            label="Gebrauchte Minuten"
            type={'number'}
            value={min}
            onChange={handleChangedMin}
            required={true}
            variant="filled"
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {gospelInputFieldProps.gospelType !== GospelType.CONTACT && (
          <TextField
            id="filled-select-currency"
            label={'Anzahl'}
            type={'number'}
            value={total}
            onChange={handleChangedTotal}
            required={true}
            variant="filled"
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {gospelInputFieldProps.gospelType === GospelType.SUPPORT && (
          <TextField
            id="outlined-select-currency-native"
            label="Titel"
            multiline
            required={true}
            value={title}
            onChange={handleChangedTitle}
          ></TextField>
        )}
        {gospelInputFieldProps.gospelType === GospelType.SUPPORT && (
          <TextField
            id="outlined-select-currency-native"
            label="Support Type"
            multiline
            required={true}
            value={supportType}
            onChange={handleChangedSupportType}
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {gospelInputFieldProps.gospelType === GospelType.CONTACT && (
          <TextField
            id="outlined-select-currency-native"
            label="Name"
            multiline
            required={true}
            disabled={gospelInputFieldProps.gospelType !== GospelType.CONTACT}
            value={name}
            onChange={handleChangedName}
          ></TextField>
        )}
        {gospelInputFieldProps.gospelType === GospelType.CONTACT && (
          <TextField
            id="outlined-select-currency-native"
            label="Email"
            multiline
            disabled={gospelInputFieldProps.gospelType !== GospelType.CONTACT}
            value={email}
            onChange={handleChangedEmail}
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {gospelInputFieldProps.gospelType === GospelType.CONTACT && (
          <TextField
            id="outlined-select-currency-native"
            label="Telefon"
            multiline
            disabled={gospelInputFieldProps.gospelType !== GospelType.CONTACT}
            value={telephone}
            onChange={handleChangedTelephone}
          ></TextField>
        )}
        {gospelInputFieldProps.gospelType === GospelType.CONTACT && (
          <TextField
            id="outlined-select-currency-native"
            label="Stadt"
            multiline
            disabled={gospelInputFieldProps.gospelType !== GospelType.CONTACT}
            value={city}
            onChange={handleChangedCity}
          ></TextField>
        )}
      </div>
      <div style={{ marginTop: '1em', display: 'flex' }}>
        {gospelInputFieldProps.gospel !== undefined && (
          <TextField
            id="filled-select-currency-native"
            label="Das Gospel Item wurde am"
            value={
              gospelInputFieldProps.gospel === undefined
                ? ''
                : new Date(
                    gospelInputFieldProps.gospel?.createdAt
                  ).toLocaleString() + ' erstellt'
            }
            disabled={true}
            variant="filled"
          ></TextField>
        )}
      </div>

      <div style={{ marginTop: '1em', display: 'flex' }}>
        <Button
          onClick={() => meditationSave()}
          color="primary"
          variant="outlined"
          startIcon={<SaveIcon />}
        >
          Änderung speichern
        </Button>
        <Button
          onClick={gospelInputFieldProps.deleteGospelAction}
          style={{ marginLeft: '15em' }}
          color="secondary"
          variant="outlined"
          disabled={gospelInputFieldProps.gospel === undefined}
          endIcon={<DeleteIcon />}
        >
          Evangelisation Item löschen
        </Button>
      </div>
    </Box>
  );
}
