import { useJoi } from '../../../../../../hooks/useJoi';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { Stack } from '@mui/material';
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
  GodGiving,
  GodGivingType,
  UpsertGodGivingRequest,
  UpsertGodGivingRequestSchema
} from '../../../../../../models/GodGiving';
import _moment from 'moment';

interface GodGivingInputFormProps {
  godGiving?: GodGiving;
  weekOfYear: number;
  godGivingType: GodGivingType;
  onSubmit: (data: UpsertGodGivingRequest) => void;
  deleteGodGivingAction: () => void;
}

export type FormControls = UpsertGodGivingRequest;

export function GodGivingInputForm({
  godGiving,
  weekOfYear,
  godGivingType,
  onSubmit,
  deleteGodGivingAction
}: GodGivingInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(godGivingType as GodGivingType);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormControls>({
    defaultValues: {
      godGivingType: godGivingType,
      amount: godGiving?.amount,
      total: godGiving?.total,
      timeInMinute: godGiving?.timeInMinute,
      description: godGiving?.description,
      weekOfYear: weekOfYear
    },
    resolver: joiResolver(
      UpsertGodGivingRequestSchema.messages(validationMessages)
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
            {godGivingType !== GodGivingType.MONEY && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="total"
                  aria-label={t('Anzahl')}
                  aria-errormessage={errors.total?.message}
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
                            defaultValue={godGiving?.total}
                            type={'number'}
                            onBlur={field.onBlur}
                            error={errors.total?.message !== undefined}
                            onChange={field.onChange}
                            required={true}
                            label={t('Anzahl')}
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
                            defaultValue={godGiving?.timeInMinute}
                            onChange={field.onChange}
                            id="timeInMinute"
                            type={'number'}
                            name={field.name}
                            required={true}
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
            )}
            {godGivingType === GodGivingType.MONEY && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="amount"
                  aria-label={t('Betrag')}
                  aria-errormessage={errors.total?.message}
                >
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            id="amount"
                            name={field.name}
                            defaultValue={godGiving?.amount}
                            type={'number'}
                            onBlur={field.onBlur}
                            error={errors.total?.message !== undefined}
                            onChange={field.onChange}
                            required={true}
                            label={t('Betrag')}
                          ></TextField>
                          {errors.total?.message && errors.total?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                  {}
                </FormControl>{' '}
              </div>
            )}
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="description"
                aria-label={t('Beschreibung')}
                aria-errormessage={errors.description?.message}
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          multiline
                          defaultValue={godGiving?.description}
                          onBlur={field.onBlur}
                          error={errors.description?.message !== undefined}
                          required={godGivingType !== GodGivingType.CHORE}
                          onChange={field.onChange}
                          id="description"
                          name={field.name}
                          label={t('Beschreibung')}
                        ></TextField>
                        {errors.description?.message &&
                          errors.description?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {godGiving && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(godGiving.createdAt)
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
                  disabled={godGiving === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteGodGivingAction}
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
