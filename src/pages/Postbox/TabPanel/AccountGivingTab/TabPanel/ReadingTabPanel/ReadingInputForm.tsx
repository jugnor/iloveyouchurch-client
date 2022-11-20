import {
  Reading, ReadingType,
  UpsertReadingRequest,
  UpsertReadingRequestSchema
} from '../../../../../../models/Reading';
import { useJoi } from '../../../../../../hooks/useJoi';
import {
  Controller,
  DeepMap,
  FieldError,
  Resolver,
  useForm
} from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CircularProgress, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import * as React from "react";
import SaveIcon from "@mui/icons-material/Save";

interface ReadingInputFormProps {
  reading?: Reading;
  weekOfYear:number;
  readingType:ReadingType;
  loading: boolean;
  onSubmit: (data:UpsertReadingRequest) => void;
  deleteReadingAction:()=>void
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

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<FormControls>({
    defaultValues: {
      title: undefined,
      timeInMinute: undefined,
      theme: undefined,
      referenceEnd: undefined,
      totalCap: undefined,
      theEnd: undefined,
      readingType: readingType,
      weekOfYear:weekOfYear
    },

    resolver: joiResolver(
      UpsertReadingRequestSchema.messages(validationMessages)
    ) as Resolver<FormControls, object>
  });

  const type = watch('readingType');

  return (
    <>
      {' '}
      {loading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' }
          }}
          noValidate
          autoComplete="off"
          marginX="15em"
        >
          <Stack spacing={'xl'}>
            <div>
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
                      <TextField
                        id="totalCap"
                        name={field.name}
                        value={reading?.totalCap}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl
                id="timeInMinute"
                aria-label={t('"Gebrauchte Zeit')}
                aria-errormessage={errors.timeInMinute?.message}
              >
                <Controller
                  name="timeInMinute"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        id="timeInMinute"
                        name={field.name}
                        value={reading?.timeInMinute}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div>
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
                        id="theme"
                        name={field.name}
                        value={reading?.theme}
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
                        id="referenceEnd"
                        name={field.name}
                        value={reading?.referenceEnd}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div>
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
                      <TextField
                        id="title"
                        name={field.name}
                        value={readingType === ReadingType.C_BOOK?reading?.title:"Bibel"}
                        disabled={readingType !== ReadingType.C_BOOK}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl
                id="Ende"
                aria-label={t('Ende ?')}
                aria-errormessage={errors.theEnd?.message}
              >
                <Controller
                  name="theEnd"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        id="title"
                        name={field.name}
                        value={reading?.theEnd}
                      ></TextField>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {reading && (
              <div>
                <FormControl
                  id="Ende"
                  aria-label={t('Ende ?')}
                  aria-errormessage={errors.theEnd?.message}
                >
                  <Controller
                    name="theEnd"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          id="title"
                          name={field.name}
                          value={reading.theEnd}
                        ></TextField>
                      );
                    }}
                  ></Controller>
                </FormControl>{' '}
              </div>
            )}
            <Stack aria-orientation="horizontal"></Stack>
           <div>
             <Button
               color="secondary"
               variant="outlined"
               size="small"
               disabled={reading === undefined}
               startIcon={<DeleteIcon />}
               aria-label={t('Reading Item löschen')}
               onClick={deleteReadingAction}
             ></Button>
             <Button
               aria-label={t('Reading Item Speichern')}
               type="submit"
               size="small"
               color="primary"
               variant="outlined"
               endIcon={<SaveIcon />}
             >
               Änderung speichern
             </Button>

           </div>
          </Stack>
        </Box>
      </form>
    </>
  );
}
