import {
  Reading,
  ReadingType,
  UpsertReadingRequest,
  UpsertReadingRequestSchema
} from '../../../../../../models/Reading';
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
import _moment from 'moment';

interface ReadingInputFormProps {
  reading?: Reading;
  weekOfYear: number;
  readingType: ReadingType;
  loading: boolean;
  onSubmit: (data: UpsertReadingRequest) => void;
  deleteReadingAction: () => void;
}

export type FormControls = UpsertReadingRequest;

export function ReadingInputForm({
  reading,
  weekOfYear,
  readingType,
  loading,
  onSubmit,
  deleteReadingAction
}: ReadingInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useDisciplineType(readingType as ReadingType);

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormControls>({
    defaultValues: {
      title: readingType === ReadingType.BIBLE ? 'Bible' : reading?.title,
      timeInMinute: reading?.timeInMinute,
      totalCap: reading?.totalCap,
      theEnd: reading?.theEnd,
      referenceEnd: reading?.referenceEnd,
      theme: reading?.theme,
      readingType: readingType,
      weekOfYear: weekOfYear
    },

    resolver: joiResolver(
      UpsertReadingRequestSchema.messages(validationMessages)
    ) as Resolver<FormControls, object>
  });

  const type = watch('readingType');

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
                id="totalCap"
                aria-label={t('Totale gelesene Kapiteln')}
                aria-errormessage={errors.totalCap?.message}
              >
                <Controller
                  name="totalCap"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="totalCap"
                          name={field.name}
                          defaultValue={reading?.totalCap}
                          type={'number'}
                          onBlur={field.onBlur}
                          error={errors.totalCap?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          label={t('Totale gelesene Kapiteln')}
                        ></TextField>
                        {errors.totalCap?.message && errors.totalCap?.message}
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
                          defaultValue={reading?.timeInMinute}
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
                        defaultValue={reading?.theme}
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
                id="referenceEnd"
                aria-label={t('Referenz')}
                aria-errormessage={errors.referenceEnd?.message}
              >
                <Controller
                  name="referenceEnd"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        multiline
                        defaultValue={reading?.referenceEnd}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        id="referenceEnd"
                        name={field.name}
                        label={t('Referenz')}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="title"
                aria-label={t('Titel')}
                aria-errormessage={errors.theme?.message}
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          multiline
                          defaultValue={
                            readingType === ReadingType.BIBLE
                              ? 'Bible'
                              : reading?.title
                          }
                          onBlur={field.onBlur}
                          error={errors.title?.message !== undefined}
                          required={true}
                          onChange={field.onChange}
                          id="title"
                          name={field.name}
                          disabled={readingType !== ReadingType.C_BOOK}
                          label={t('Titel')}
                        ></TextField>
                        {errors.title?.message && errors.title?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="theEnd" aria-label={t('Ende ?')}>
                <Controller
                  name="theEnd"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack style={{ marginLeft: '10em', display: 'flex' }}>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Ende des Buches ?
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={reading?.theEnd}
                          onBlur={field.onBlur}
                          name="radio-buttons-group"
                          onChange={field.onChange}
                        >
                          <FormControlLabel
                            name={field.name}
                            value={true}
                            control={<Radio />}
                            label="Ja"
                          />
                          <FormControlLabel
                            name={field.name}
                            value={false}
                            control={<Radio />}
                            label="Nein"
                          />
                        </RadioGroup>
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {reading && (
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(reading.createdAt)
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
                  disabled={reading === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteReadingAction}
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
