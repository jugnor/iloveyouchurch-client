import Box from '@mui/material/Box';
import { FormControl, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import _moment from 'moment/moment';
import {
  Regulation,
  UpsertRegulationRequest,
  UpsertRegulationRequestSchema
} from '../../../../../models/Regulation';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useJoi } from '../../../../../hooks/useJoi';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';

export interface RegulationRecapInputFormProps {
  regulation?: Regulation;
  onSubmit: (data: UpsertRegulationRequest) => void;
  deleteRegulationAction: () => void;
}
export type FormControls = UpsertRegulationRequest;

export function RegulationRecapInputForm({
  regulation,
  onSubmit,
  deleteRegulationAction
}: RegulationRecapInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormControls>({
    defaultValues: {
      prayerAlone: regulation?.prayerAlone,
      prayerInGroup: regulation?.prayerInGroup,
      prayerNight: regulation?.prayerNight,
      meditation: regulation?.meditation,
      retreat: regulation?.retreat,
      partialFasting: regulation?.partialFasting,
      completeFasting: regulation?.completeFasting,
      bibleReading: regulation?.bibleReading,
      clReading: regulation?.clReading,
      godGiving: regulation?.godGiving,
      thanksGiving: regulation?.thanksGiving,
      choreRepeat: regulation?.choreRepeat,
      gospel: regulation?.gospel,
      gospelContact: regulation?.gospelContact,
      gospelSupport: regulation?.gospelSupport
    },

    resolver: joiResolver(
      UpsertRegulationRequestSchema.messages(validationMessages)
    ) as Resolver<FormControls, object>
  });
  return (
    <>
      <div onSubmit={handleSubmit(onSubmit)}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 4, width: '40ch' }
          }}
          noValidate
          autoComplete="off"
          overflow="scroll"
          style={{ backgroundColor: '#F0F8FF' }}
        >
          <Stack spacing={'xl'}>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="prayerAlone"
                aria-errormessage={errors.prayerAlone?.message}
              >
                <Controller
                  name="prayerAlone"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          onBlur={field.onBlur}
                          id="prayerAlone"
                          error={errors.prayerAlone?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.prayerAlone}
                          type={'number'}
                          name={field.name}
                          label={t('Gebet-Allein')}
                        ></TextField>
                        {errors.prayerAlone?.message &&
                          errors.prayerAlone?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="prayerInGroup">
                <Controller
                  name="prayerInGroup"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="prayerInGroup"
                          onBlur={field.onBlur}
                          error={errors.prayerInGroup?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.prayerInGroup}
                          type={'number'}
                          name={field.name}
                          label={t('Gebet in Gruppe')}
                        ></TextField>
                        {errors.prayerInGroup?.message &&
                          errors.prayerInGroup?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="prayerNight">
                {console.log('nacht', regulation?.prayerNight)}
                <Controller
                  name="prayerNight"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="prayerNight"
                          onBlur={field.onBlur}
                          error={errors.prayerNight?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.prayerNight}
                          type={'number'}
                          name={field.name}
                          label={t('Gebetsnacht')}
                        ></TextField>
                        {errors.prayerNight?.message &&
                          errors.prayerNight?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl id="meditation">
                <Controller
                  name="meditation"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="meditation"
                          onBlur={field.onBlur}
                          error={errors.meditation?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          name={field.name}
                          defaultValue={regulation?.meditation}
                          type={'number'}
                          label={t('Meditation')}
                        ></TextField>
                        {errors.meditation?.message &&
                          errors.meditation?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="retreat">
                <Controller
                  name="retreat"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="retreat"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.retreat?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.retreat}
                          type={'number'}
                          label={t('Auszeit')}
                        ></TextField>
                        {errors.retreat?.message && errors.retreat?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="choreRepeat">
                <Controller
                  name="choreRepeat"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="choreRepeat"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.retreat?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.choreRepeat}
                          type={'number'}
                          label={t('Probe')}
                        ></TextField>
                        {errors.choreRepeat?.message &&
                          errors.choreRepeat?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl
                id="partialFasting"
                aria-errormessage={errors.prayerAlone?.message}
              >
                <Controller
                  name="partialFasting"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="partialFasting"
                          name={field.name}
                          onBlur={field.onBlur}
                          error={errors.partialFasting?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.partialFasting}
                          type={'number'}
                          label={t('Teil-Fasten')}
                        ></TextField>
                        {errors.partialFasting?.message &&
                          errors.partialFasting?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl
                id="completeFasting"
                aria-errormessage={errors.prayerAlone?.message}
              >
                <Controller
                  name="completeFasting"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="completeFasting"
                          name={field.name}
                          onBlur={field.onBlur}
                          error={errors.completeFasting?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.completeFasting}
                          type={'number'}
                          label={t('Komplettes Fasten')}
                        ></TextField>
                        {errors.completeFasting?.message &&
                          errors.completeFasting?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="thanksGiving">
                <Controller
                  name="thanksGiving"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="thanksGiving"
                          name={field.name}
                          onBlur={field.onBlur}
                          error={errors.thanksGiving?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.thanksGiving}
                          type={'number'}
                          label={t('Danksagung')}
                        ></TextField>
                        {errors.thanksGiving?.message &&
                          errors.thanksGiving?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl id="bibleReading">
                <Controller
                  name="bibleReading"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="bibleReading"
                          name={field.name}
                          onBlur={field.onBlur}
                          error={errors.bibleReading?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.bibleReading}
                          type={'number'}
                          label={t('Bibel-Lesen')}
                        ></TextField>
                        {errors.bibleReading?.message &&
                          errors.bibleReading?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="clReading">
                <Controller
                  name="clReading"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="clReading"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.clReading?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.clReading}
                          type={'number'}
                          label={t('Buch-Lesen')}
                        ></TextField>
                        {errors.clReading?.message && errors.clReading?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="godGiving">
                <Controller
                  name="godGiving"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="godGiving"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.godGiving?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.godGiving}
                          type={'number'}
                          label={t('Spende')}
                        ></TextField>
                        {errors.godGiving?.message && errors.godGiving?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            <div style={{ marginTop: '1em', display: 'flex' }}>
              <FormControl id="gospel">
                <Controller
                  name="gospel"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="gospel"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.gospel?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.gospel}
                          type={'number'}
                          label={t('Evangelisation')}
                        ></TextField>
                        {errors.gospel?.message && errors.gospel?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="gospelContact">
                <Controller
                  name="gospelContact"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="gospelContact"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.gospelContact?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.gospelContact}
                          type={'number'}
                          label={t('Kontakt')}
                        ></TextField>
                        {errors.gospelContact?.message &&
                          errors.gospelContact?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
              <FormControl id="gospelSupport">
                <Controller
                  name="gospelSupport"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          id="gospelSupport"
                          onBlur={field.onBlur}
                          name={field.name}
                          error={errors.gospelSupport?.message !== undefined}
                          onChange={field.onChange}
                          required={true}
                          defaultValue={regulation?.gospelSupport}
                          type={'number'}
                          label={t('Traktat')}
                        ></TextField>
                        {errors.gospelSupport?.message &&
                          errors.gospelSupport?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
            </div>
            {regulation && (
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
            )}
            <Stack aria-orientation="horizontal">
              <div style={{ marginTop: '1em', display: 'flex' }}>
                <Button
                  color={'error'}
                  variant="outlined"
                  size="small"
                  disabled={regulation === undefined}
                  startIcon={<DeleteIcon />}
                  onClick={deleteRegulationAction}
                >
                  Regulation Item löschen
                </Button>
                <Button
                  style={{ marginLeft: '17em' }}
                  size="small"
                  type={'submit'}
                  color="primary"
                  variant="outlined"
                  endIcon={<SaveIcon />}
                >
                  Regulation Item speichern
                </Button>
              </div>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}
