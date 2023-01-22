import {
  Prayer,
  PrayerType,
  UpsertPrayerRequest,
  UpsertPrayerRequestSchema
} from '../../../../../../models/Prayer';
import { useJoi } from '../../../../../../hooks/useJoi';
import { useTranslation } from 'react-i18next';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import * as React from 'react';
import _moment from 'moment';

interface PrayerInputFormProps {
  prayer?: Prayer;
  weekOfYear: number;
  prayerType: PrayerType;
  onSubmit: (data: UpsertPrayerRequest) => void;
  deletePrayerAction: () => void;
}

export type FormControls = UpsertPrayerRequest;

export function PrayerInputForm({
  prayer,
  weekOfYear,
  prayerType,
  onSubmit,
  deletePrayerAction
}: PrayerInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(prayerType as PrayerType);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormControls>({
    defaultValues: {
      prayerType: prayerType,
      timeInMinute: prayer?.timeInMinute,
      theme: prayer?.theme,
      prayerNight: prayer?.prayerNight,
      weekOfYear: weekOfYear
    },

    resolver: joiResolver(
      UpsertPrayerRequestSchema.messages(validationMessages)
    ) as Resolver<FormControls, object>
  });

  return (
    <>
      {' '}
      <div onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' }
          }}
          noValidate
          autoComplete="off"
          overflow="scroll"
        >
          <Stack spacing={'xl'}>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="timeInMinute"
                aria-label={t('Gebrauchte Zeit')}
                aria-errormessage={errors.timeInMinute?.message}
              >
                <Controller
                  name="timeInMinute"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          onBlur={field.onBlur}
                          error={errors.timeInMinute?.message !== undefined}
                          defaultValue={prayer?.timeInMinute}
                          required={true}
                          onChange={field.onChange}
                          id="timeInMinute"
                          type={'number'}
                          name={field.name}
                          label={t('Gebrauchte Zeit')}
                        ></TextField>
                        {errors.timeInMinute?.message &&
                          errors.timeInMinute?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl
                id="theme"
                aria-label={t('Thema')}
                aria-errormessage={errors.theme?.message}
              >
                <Controller
                  name="theme"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={prayer?.theme}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        id="theme"
                        name={field.name}
                        label={t('Thema')}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {prayerType === PrayerType.GROUP && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="prayerNight"
                  aria-label={t('Anzahl Gebtsnächte')}
                  aria-errormessage={errors.prayerNight?.message}
                >
                  <Controller
                    name="prayerNight"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            id="prayerNight"
                            name={field.name}
                            defaultValue={prayer?.prayerNight}
                            type={'number'}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            label={t('Anzahl Gebtsnächte')}
                          ></TextField>
                        </Stack>
                      );
                    }}
                  ></Controller>
                  {}
                </FormControl>
              </div>
            )}
            {prayer && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(prayer.createdAt)
                    .local()
                    .format('DD.MM.YYYY, HH:mm')}
                  label={'Datum der Erstellung'}
                ></TextField>
              </div>
            )}
            <Stack aria-orientation="horizontal">
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <Button
                  color={'error'}
                  variant="outlined"
                  size="small"
                  disabled={prayer === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deletePrayerAction}
                >
                  {translateType()} Item löschen
                </Button>
                <Button
                  style={{ marginLeft: '17em' }}
                  size="small"
                  type={'submit'}
                  color="primary"
                  variant="outlined"
                  endIcon={<SaveIcon />}
                >
                  {translateType()} Item speichern
                </Button>
              </div>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}
