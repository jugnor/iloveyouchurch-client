import { ReadingType } from '../../../../../../models/Reading';
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
  Gospel,
  GospelContact,
  GospelSupport,
  GospelType,
  UpsertGospelRequest,
  UpsertGospelRequestSchema
} from '../../../../../../models/Gospel';
import _moment from 'moment';

interface GospelInputFormProps {
  gospel?: Gospel;
  weekOfYear: number;
  gospelType: GospelType;
  onSubmit: (data: UpsertGospelRequest) => void;
  deleteGospelAction: () => void;
}

export type FormControls = UpsertGospelRequest;

export function GospelInputForm({
  gospel,
  weekOfYear,
  gospelType,
  onSubmit,
  deleteGospelAction
}: GospelInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(gospelType as GospelType);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormControls>({
    defaultValues: {
      gospelType: gospelType,
      total: gospel?.total,
      goal: gospel?.goal,
      gospelContact: gospel?.gospelContact,
      gospelSupport: gospel?.gospelSupport,
      weekOfYear: weekOfYear
    },

    resolver: joiResolver(
      UpsertGospelRequestSchema.messages(validationMessages)
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
              {gospelType !== GospelType.CONTACT && (
                <>
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
                              defaultValue={gospel?.total}
                              type={'number'}
                              onBlur={field.onBlur}
                              error={errors.total?.message !== undefined}
                              onChange={field.onChange}
                              required={true}
                              label={t('Anzahl')}
                            ></TextField>
                            {errors.total?.message}
                          </Stack>
                        );
                      }}
                    ></Controller>
                    {}
                  </FormControl>
                </>
              )}
              {gospelType === GospelType.GOSPEL && (
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
                            defaultValue={gospel?.timeInMinute}
                            onChange={field.onChange}
                            id="timeInMinute"
                            type={'number'}
                            name={field.name}
                            required={true}
                            label={t('Gebrauchte Zeit')}
                          ></TextField>
                          {errors.timeInMinute?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                </FormControl>
              )}
            </div>
            {gospelType === GospelType.CONTACT && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="name"
                  aria-label={t('Name')}
                  aria-errormessage={errors.gospelContact?.name?.message}
                >
                  <Controller
                    name="gospelContact.name"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            multiline
                            defaultValue={gospel?.gospelContact.name}
                            error={
                              errors.gospelContact?.name?.message !== undefined
                            }
                            onBlur={field.onBlur}
                            required={true}
                            onChange={field.onChange}
                            id="name"
                            name={field.name}
                            label={t('Name')}
                          ></TextField>
                          {errors.gospelContact?.name?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                </FormControl>
                <FormControl
                  id="gospelContact.email"
                  aria-label={t('Email')}
                  aria-errormessage={errors.gospelContact?.email?.message}
                >
                  <Controller
                    name="gospelContact.email"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            multiline
                            defaultValue={gospel?.gospelContact.email}
                            error={
                              errors.gospelContact?.email?.message !== undefined
                            }
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            id="gospelContact.email"
                            name={field.name}
                            label={t('Email')}
                          ></TextField>
                          {errors.gospelContact?.email?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                </FormControl>
              </div>
            )}
            {gospelType === GospelType.CONTACT && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="gospelContact.telephone"
                  aria-label={t('Telefone')}
                  aria-errormessage={errors.gospelContact?.telephone?.message}
                >
                  <Controller
                    name="gospelContact.telephone"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          multiline
                          defaultValue={gospel?.gospelContact.telephone}
                          onBlur={field.onBlur}
                          required={true}
                          onChange={field.onChange}
                          id="gospelContact.telephone"
                          name={field.name}
                          label={t('Telefone')}
                        ></TextField>
                      );
                    }}
                  ></Controller>
                </FormControl>
                <FormControl id="city" aria-label={t('Stadt')}>
                  <Controller
                    name="gospelContact.city"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          multiline
                          defaultValue={gospel?.gospelContact.city}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          id="gospelContact.city"
                          name={field.name}
                          label={t('Stadt')}
                        ></TextField>
                      );
                    }}
                  ></Controller>
                </FormControl>
              </div>
            )}

            {gospelType === GospelType.SUPPORT && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <FormControl
                  id="name"
                  aria-label={t('Titel')}
                  aria-errormessage={errors.gospelSupport?.title?.message}
                >
                  <Controller
                    name="gospelSupport.title"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            multiline
                            defaultValue={gospel?.gospelSupport.title}
                            error={
                              errors.gospelSupport?.title?.message !== undefined
                            }
                            onBlur={field.onBlur}
                            required={true}
                            onChange={field.onChange}
                            id="gospelSupport.title"
                            name={field.name}
                            label={t('Titel')}
                          ></TextField>
                          {errors.gospelSupport?.title?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                </FormControl>
                <FormControl
                  id="gospelSupport.supportType"
                  aria-label={t('SupportType')}
                  aria-errormessage={errors.gospelSupport?.supportType?.message}
                >
                  <Controller
                    name="gospelSupport.supportType"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Stack>
                          <TextField
                            multiline
                            defaultValue={gospel?.gospelSupport.supportType}
                            error={
                              errors.gospelSupport?.supportType?.message !==
                              undefined
                            }
                            required={true}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            id="gospelSupport.supportType"
                            name={field.name}
                            label={t('SupportType')}
                          ></TextField>
                          {errors.gospelSupport?.supportType?.message}
                        </Stack>
                      );
                    }}
                  ></Controller>
                </FormControl>
              </div>
            )}
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="goal"
                aria-label={t('Ziele')}
                aria-errormessage={errors.gospelSupport?.title?.message}
              >
                <Controller
                  name="goal"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={gospel?.goal}
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
            {gospel && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(gospel.createdAt)
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
                  disabled={gospel === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteGospelAction}
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
