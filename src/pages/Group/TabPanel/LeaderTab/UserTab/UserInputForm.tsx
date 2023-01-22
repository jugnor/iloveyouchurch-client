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
import { useJoi } from '../../../../../hooks/useJoi';
import {
  InviteUserByMailRequest,
  UpsertUserRequest,
  UpsertUserRequestSchema,
  UserModel
} from '../../../../../models/UserModel';

interface UserInputFormProps {
  user?: UserModel;
  onSubmit: (data: InviteUserByMailRequest) => void;
}

export type FormControls = UpsertUserRequest;

export function UserInputForm({ user, onSubmit }: UserInputFormProps) {
  const { validationMessages } = useJoi();
  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<FormControls>({
    defaultValues: {
      email: user?.email
    },

    resolver: joiResolver(
      UpsertUserRequestSchema.messages(validationMessages)
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
                id="email"
                aria-label={t('Email')}
                aria-errormessage={errors.email?.message}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Stack>
                        <TextField
                          multiline
                          defaultValue={user?.email}
                          error={errors.email?.message !== undefined}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          id="email"
                          name={field.name}
                          label={t('Email')}
                        ></TextField>
                        {errors.email?.message && errors.email?.message}
                      </Stack>
                    );
                  }}
                ></Controller>
              </FormControl>
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
                  Nutzer in der Gruppe zuordnen
                </Button>
              </div>
            </Stack>
          </Stack>
        </Box>
      </div>
    </>
  );
}
