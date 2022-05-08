import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Activity, UpsertActivityRequest} from "../models/Activity";
import {matchMutate} from '../../swr';
import {useApi} from './useApi';
import useSWR, {mutate, SWRResponse} from "swr";
import {ActivityType} from "../models/ActivityType";
import {ActivityOrder} from "../models/ActivityOrder";
import {ResultsObject} from "../models/ResultsObject";


export function useActivity(postboxId: string) {
  const {makeRequest, makeRequestWithFullResponse, fetcher} = useApi();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);

  const activityByTypeAndOrder = (type: ActivityType, order: ActivityOrder): Activity | undefined => {
    const {
      data,
      error
    } = useSWR<Activity>(`/postboxes/${postboxId}?type=${type}&order=${order}`, fetcher);
    return data;
  }

  const activitiesByType = ( type: ActivityType): SWRResponse<ResultsObject<Activity>, Error> => {
    return useSWR<ResultsObject<Activity>>(`/postboxes/${postboxId}/activity-results?type=${type}`);
  }


  const createActivity = useCallback(async (data: UpsertActivityRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newActivityResponse = await makeRequestWithFullResponse<Activity>(
          `/postboxes/${postboxId}/activities`,
          'POST',
          data);

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/activities.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/activity-results.*$`)
        );
        if (!silent) {
          alert('success: Fall erfolgreich erstellt.');
        }
        setLoading(false);

        return newActivityResponse.data;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteActivity = useCallback(
    async (activityId: string,activityType:string) => {
      setLoading(true);

      try {
        await makeRequest(`/postboxes/${postboxId}/activities/${activityId}?type=${activityType}`, 'DELETE');

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/activities.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/activity-results.*$`)
        );
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
  const getActivities = useCallback(
    async (activityType: ActivityType, week?: string) => {
      setLoading(true);
      try {
        const activities = await makeRequest<Activity[]>(`/postboxes/${postboxId}/activity-results?type=${activityType}&week=${week}`, 'GET');

        await matchMutate(new RegExp(`^/postboxes/${postboxId}/activity-results.*$`));

        await matchMutate(
          new RegExp(`^/postboxes/${postboxId}/activity-results.*$`)
        );

        alert('success: Activities aufgerufen.');
        setLoading(false);
        return activities;
      } catch (e) {
        alert('error: Da ist leider etwas schiefgelaufen.');
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  return {createActivity, updateActivity, deleteActivity,activityByTypeAndOrder};
}

