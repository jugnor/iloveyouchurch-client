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
import {
  Fasting,
  FastingType,
  UpsertFastingRequest,
  UpsertFastingRequestSchema
} from '../../../../../../models/Fasting';
import Joi from 'joi';
import _moment from 'moment';

interface FastingInputFormProps {
  fasting?: Fasting;
  weekOfYear: number;
  fastingType: FastingType;
  onSubmit: (data: UpsertFastingRequest) => void;
  deleteFastingAction: () => void;
}

export type FormControls = UpsertFastingRequest;

export function FastingInputForm({
  fasting,
  weekOfYear,
  fastingType,
  onSubmit,
  deleteFastingAction
}: FastingInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(fastingType as FastingType);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormControls>({
    defaultValues: {
      fastingType: fastingType,
      days: fasting?.days,
      goal: fasting?.goal,
      weekOfYear: weekOfYear
    },

    resolver: joiResolver(
      UpsertFastingRequestSchema.messages(validationMessages)
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
          overflow="scroll"
        >
          <Stack spacing={'xl'}>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="days"
                aria-label={t('Anzahl der Tage')}
                aria-errormessage={errors.days?.message}
              >
                <Controller
                  name="days"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          onBlur={field.onBlur}
                          error={errors.days?.message !== undefined}
                          defaultValue={fasting?.days}
                          required={true}
                          onChange={field.onChange}
                          id="days"
                          type={'number'}
                          name={field.name}
                          label={t('Anzahl der Tage')}
                        ></TextField>
                        {errors.days?.message && errors.days?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl
                id="goal"
                aria-label={t('Ziele')}
                aria-errormessage={errors.goal?.message}
              >
                <Controller
                  name="goal"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={fasting?.goal}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        id="goal"
                        name={field.name}
                        label={t('Ziele')}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>

            {fasting && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(fasting.createdAt)
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
                  disabled={fasting === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteFastingAction}
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
