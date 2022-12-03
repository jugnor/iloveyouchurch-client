import { useJoi } from '../../../../../../hooks/useJoi';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack
} from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import * as React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { useDisciplineType } from '../../../../../../hooks/useDisciplineType';

import {
  Meditation,
  RetreatType,
  UpsertMeditationRequest,
  UpsertMeditationRequestSchema
} from '../../../../../../models/Meditation';

interface MeditationInputFormProps {
  meditation?: Meditation;
  weekOfYear: number;
  retreatType: RetreatType;
  onSubmit: (data: UpsertMeditationRequest) => void;
  deleteMeditationAction: () => void;
}

export type FormControls = UpsertMeditationRequest;

export function MeditationInputForm({
  meditation,
  weekOfYear,
  retreatType,
  onSubmit,
  deleteMeditationAction
}: MeditationInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(retreatType as RetreatType);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormControls>({
    defaultValues: {
      retreatType: retreatType,
      timeInMinute: meditation?.timeInMinute,
      total: meditation?.total,
      theme: meditation?.theme,
      verse: meditation?.verse,
      weekOfYear: weekOfYear
    },

    resolver: joiResolver(
      UpsertMeditationRequestSchema.messages(validationMessages)
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
            <div style={{ display: 'flex' }}>
              <FormControl
                id="total"
                aria-label={t('Anzahl stiller zeite')}
                aria-errormessage={'errors.totalCap?.message'}
              >
                <Controller
                  name="total"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="total"
                          name={field.name}
                          defaultValue={meditation?.total}
                          type={'number'}
                          onBlur={field.onBlur}
                          error={errors.total?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          label={t('Anzahl stiller zeite')}
                        ></TextField>
                        {errors.total?.message && errors.total?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
                {}
              </FormControl>
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
                          defaultValue={meditation?.timeInMinute}
                          onChange={field.onChange}
                          id="timeInMinute"
                          type={'number'}
                          required={true}
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
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
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
                        defaultValue={meditation?.theme}
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
              <FormControl
                id="verse"
                aria-label={t('Referenz')}
                aria-errormessage={errors.verse?.message}
              >
                <Controller
                  name="verse"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={meditation?.verse}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        id="verse"
                        name={field.name}
                        label={t('Verse')}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {meditation && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={meditation.createdAt}
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
                  disabled={meditation === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteMeditationAction}
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
