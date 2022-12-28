import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, UpsertActivityRequest } from '../models/Activity';
import { MatchMutate } from '../swr';
import { useApi } from './useApi';
import useSWR, { mutate, SWRResponse } from 'swr';
import { ActivityType } from '../models/ActivityType';
import { ILCError } from '../utils/ErrorCode';

export function useActivity(postboxId: string) {
  const { makeRequest, makeRequestWithFullResponse, fetcher } = useApi();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const createActivity = useCallback(
    async (data: UpsertActivityRequest, silent?: boolean) => {
      setLoading(true);
      try {
        const newActivityResponse = await makeRequestWithFullResponse<Activity>(
          `/postboxes/${postboxId}/activities`,
          'POST',
          data
        );

        setLoading(false);

        return newActivityResponse.data;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, makeRequestWithFullResponse, postboxId, t]
  );

  const deleteActivity = useCallback(
    async (activityId: string, activityType: string) => {
      setLoading(true);

      try {
        const updatedCase =  await makeRequest(
          `/postboxes/${postboxId}/activities/${activityId}?type=${activityType}`,
          'DELETE'
        );

        setLoading(false);
        return updatedCase
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [alert, makeRequest, postboxId, t]
  );

  const updateActivity = useCallback(
    async (activityId: string, data: UpsertActivityRequest) => {
      setLoading(true);
      try {
        const updatedCase = await makeRequest<Activity>(
          `/postboxes/${postboxId}/activities/${activityId}`,
          'PUT',
          data
        );

        setLoading(false);

        return updatedCase;
      } catch (e) {
        const ilcError = e as ILCError;
        setAlertMessage(
          'Der Server returniert einen Fehler: ' + ilcError.httpStatus
        );
        setLoading(false);

        throw e;
      }
    },
    [makeRequest, postboxId, t]
  );
  const getActivities = useCallback(
    async (activityType: ActivityType, week?: string) => {
      setLoading(true);
      try {
        const activities = await makeRequest<Activity[]>(
          `/postboxes/${postboxId}/activity-results?type=${activityType}&week=${week}`,
          'GET'
        );

        await MatchMutate(
          new RegExp(`^/postboxes/${postboxId}/activity-results.*$`)
        );

        await MatchMutate(
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

  return {
    createActivity,
    updateActivity,
    deleteActivity,
    alertMessage,
    loading
  };
}
