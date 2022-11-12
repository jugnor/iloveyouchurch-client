import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, UpsertActivityRequest } from '../models/Activity';
import { MatchMutate } from '../swr';
import { useApi } from './useApi';
import useSWR, { mutate, SWRResponse } from 'swr';
import { ActivityType } from '../models/ActivityType';
import { ActivityOrder } from '../models/ActivityOrder';
import { ResultsObject } from '../models/ResultsObject';
import {
  UpsertUserToPostboxRequest,
  UpdateUserToPostboxRequest,
  UserPostboxModel
} from '../models/UserPostboxModel';

export function useUserPostbox(postboxId: string) {
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const addUserToPostbox = useCallback(
    async (data: UpsertUserToPostboxRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUserResponse =
          await makeRequestWithFullResponse<UserPostboxModel>(
            `/postboxes/users/add`,
            'POST',
            data
          );

        await MatchMutate(new RegExp(`^/postboxes/${postboxId}/users.*$`));

        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newUserResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const updateUserToPostbox = useCallback(
    async (data: UpsertUserToPostboxRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUserResponse =
          await makeRequestWithFullResponse<UserPostboxModel>(
            `/postboxes/users/roles`,
            'PUT',
            data
          );

        await MatchMutate(new RegExp(`^/postboxes/${postboxId}/users.*$`));

        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newUserResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const removeUserFromPostbox = useCallback(
    async (userId: string) => {
      setLoading(true);

      try {
        await makeRequest(`/postboxes/${postboxId}/users/${userId}`, 'DELETE');

        await MatchMutate(new RegExp(`^/postboxes/${postboxId}/users.*$`));

        setLoading(false);
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  return { addUserToPostbox, updateUserToPostbox, removeUserFromPostbox };
}
