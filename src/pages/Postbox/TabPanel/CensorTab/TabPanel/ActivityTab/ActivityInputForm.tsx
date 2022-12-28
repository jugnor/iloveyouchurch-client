import { useJoi } from '../../../../../../hooks/useJoi';
import { useTranslation } from 'react-i18next';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import * as React from 'react';
import _moment from 'moment';
import {
  Activity,
  UpsertActivityRequest,
  UpsertActivityRequestSchema
} from '../../../../../../models/Activity';
import { ActivityType } from '../../../../../../models/ActivityType';
import { useActivityType } from '../../../../../../hooks/useActivityType';

interface ActivityInputFormProps {
  activity?: Activity;
  activityType: ActivityType;
  onSubmit: (data: UpsertActivityRequest) => void;
}

export type FormControls = UpsertActivityRequest;

export function ActivityInputForm({
  activity,
  activityType,
  onSubmit
}: ActivityInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();
  const { translateType } = useActivityType(activityType as ActivityType);

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormControls>({
    defaultValues: {
      activityType: activityType,
      description: activity?.description
    },

    resolver: joiResolver(
      UpsertActivityRequestSchema.messages(validationMessages)
    ) as Resolver<FormControls, object>
  });

  return (
    <>
      {' '}
      <div
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: '#F0F8FF' }}
      >
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
                          defaultValue={activity?.description}
                          error={errors.description?.message !== undefined}
                          onBlur={field.onBlur}
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
              {activity && (
                <TextField
                  id="createdAt"
                  disabled={true}
                  value={_moment
                    .utc(activity.createdAt)
                    .local()
                    .format('DD.MM.YYYY, HH:mm')}
                  label={'Datum der Erstellung'}
                ></TextField>
              )}
            </div>
            <Stack aria-orientation="horizontal">
              <div style={{ marginTop: '1em', display: 'flex' }}>
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
