import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { matchMutate } from '../swr';
import { useApi } from './useApi';
import { mutate } from 'swr';
import { Reading, UpsertReadingRequest } from '../models/Reading';
import { Discipline, UpsertDisciplineRequest } from '../models/Discipline';
import { UpsertUserRequest, UserModel } from '../models/UserModel';

export function useUser() {
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const createUser = useCallback(
    async (data: UpsertUserRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUseUserResponse = await makeRequestWithFullResponse<UserModel>(
          `/users`,
          'POST',
          data
        );

        await matchMutate(new RegExp(`^/users.*$`));

        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newUseUserResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, t]
  );

  const updateUser = useCallback(
    async (userId: string, data: UpsertUserRequest, silent?: boolean) => {
      setLoading(true);

      try {
        const updatedUseUser = await makeRequest<UserModel>(
          `/users/${userId}`,
          'PUT',
          data
        );

        await matchMutate(new RegExp(`^/users.*$`));

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedUseUser;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, t]
  );

  return { createUser, updateUser, loading };
}
