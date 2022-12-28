import { Regulation } from '../../../../../../models/Regulation';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import _moment from 'moment/moment';

export interface RegulationRecapInputFormProps {
  regulation?: Regulation;
}

export function RegulationRecapInputForm({
  regulation
}: RegulationRecapInputFormProps) {
  const { t } = useTranslation();

  return regulation ? (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' }
      }}
      noValidate
      autoComplete="off"
      overflow="scroll"
      style={{ backgroundColor: '#F0F8FF' }}
    >
      <Stack spacing={'xl'}>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="prayerAlone"
            value={regulation.prayerAlone}
            type={'number'}
            label={t('Gebet-Allein')}
            disabled={true}
          ></TextField>
          <TextField
            id="prayerInGroup"
            value={regulation.prayerInGroup}
            type={'number'}
            label={t('Gebet in Gruppe')}
            disabled={true}
          ></TextField>
          <TextField
            id="prayerNight"
            value={regulation.prayerNight}
            type={'number'}
            label={t('Gebetsnacht')}
            disabled={true}
          ></TextField>
        </div>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="meditation"
            value={regulation.meditation}
            type={'number'}
            label={t('Meditation')}
            disabled={true}
          ></TextField>
          <TextField
            id="retreat"
            value={regulation.retreat}
            type={'number'}
            label={t('Auszeit')}
            disabled={true}
          ></TextField>
          <TextField
            id="choreRepeat"
            value={regulation.choreRepeat}
            type={'number'}
            label={t('Probe')}
            disabled={true}
          ></TextField>
        </div>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="partialFasting"
            value={regulation.partialFasting}
            type={'number'}
            label={t('Teil-Fasten')}
            disabled={true}
          ></TextField>
          <TextField
            id="completeFasting"
            value={regulation.completeFasting}
            type={'number'}
            label={t('Komplettes Fasten')}
            disabled={true}
          ></TextField>
          <TextField
            id="thanksGiving"
            value={regulation.thanksGiving}
            type={'number'}
            label={t('Danksagung')}
            disabled={true}
          ></TextField>
        </div>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="bibleReading"
            value={regulation.bibleReading}
            type={'number'}
            label={t('Bibel-Lesen')}
            disabled={true}
          ></TextField>
          <TextField
            id="christianLiteratureReading"
            value={regulation.clReading}
            type={'number'}
            label={t('Buch-Lesen')}
            disabled={true}
          ></TextField>
          <TextField
            id="godGiving"
            value={regulation.godGiving}
            type={'number'}
            label={t('Spende')}
            disabled={true}
          ></TextField>
        </div>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="gospel"
            value={regulation.gospel}
            type={'number'}
            label={t('Evangelisation')}
            disabled={true}
          ></TextField>
          <TextField
            id="gospelContactg"
            value={regulation.clReading}
            type={'number'}
            label={t('Kontakt')}
            disabled={true}
          ></TextField>
          <TextField
            id="gospelSupport"
            value={regulation.godGiving}
            type={'number'}
            disabled={true}
            label={t('Traktat')}
          ></TextField>
        </div>
        <div style={{ marginTop: '1em', display: 'flex' }}>
          <TextField
            id="createdAt"
            disabled={true}
            value={_moment
              .utc(regulation.createdAt)
              .local()
              .format('DD.MM.YYYY, HH:mm')}
            label={t('Datum der Erstellung')}
          ></TextField>
        </div>
      </Stack>
    </Box>
  ) : (
    <div style={{ display: 'flex' }}>
      {' '}
      <Typography color={'red'}>
        <h2>{t('Es liegt momentan keine Charte vor')}</h2>
      </Typography>{' '}
    </div>
  );
}
