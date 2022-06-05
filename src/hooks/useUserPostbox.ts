import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Activity, UpsertActivityRequest} from "../models/Activity";
import {matchMutate} from '../swr';
import {useApi} from './useApi';
import useSWR, {mutate, SWRResponse} from "swr";
import {ActivityType} from "../models/ActivityType";
import {ActivityOrder} from "../models/ActivityOrder";
import {ResultsObject} from "../models/ResultsObject";
import {AddUserToPostboxRequest} from "../models/UserPostboxModel";


export function useUserPostbox(postboxId: string) {
  const {makeRequest, makeRequestWithFullResponse, fetcher} = useApi();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);

  const addUserToPostbox = useCallback(async (data: AddUserToPostboxRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newUserResponse = await makeRequestWithFullResponse<Activity>(
          `/postboxes/${postboxId}/users/add`,
          'POST',
          data);

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users.*$`));

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
        await makeRequest(`/postboxes/${postboxId}/users`, 'DELETE');

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/users.*$`));

        setLoading(false);
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  const updateActivity = useCallback(
    async (activityId: string, data: UpsertActivityRequest, silent?: boolean) => {
      setLoading(true);
  console.log("id: "+activityId)
      try {
        const updatedCase = await makeRequest<Activity>(
          `/postboxes/${postboxId}/activities/${activityId}`,
          'PUT',
          data
        );

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/activities.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/activity-results.*$`)
        );

        await mutate(`/postboxes/${postboxId}/activities/${activityId}`);

        if (!silent) {
          alert('success: Änderungen gespeichert.');
        }

        setLoading(false);

        return updatedCase;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  return {addUserToPostbox, updateActivity, removeUserFromPostbox};
}

